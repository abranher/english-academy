import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { Attachment, Chapter } from '@prisma/client';

@Injectable()
export class ChaptersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(courseId: string, createChapterDto: CreateChapterDto) {
    const courseOwner = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!courseOwner) throw new NotFoundException('Curso no encontrado.');

    const lastChapter = await this.prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await this.prisma.chapter.create({
      data: {
        title: createChapterDto.title,
        courseId,
        position: newPosition,
      },
    });

    return chapter;
  }

  async reorderChapters(courseId: string, updateChapterDto: UpdateChapterDto) {
    const { list } = updateChapterDto;

    const ownCourse = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    for (const { id, position } of list) {
      await this.prisma.chapter.update({
        where: {
          id,
        },
        data: {
          position,
        },
      });
    }

    return {
      message: 'Actualización exitosa.',
    };
  }

  findAll() {
    return `This action returns all chapters`;
  }

  async findOne(id: string, courseId: string) {
    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id,
        courseId,
      },
      include: {
        lessons: {
          include: {
            class: true,
            quiz: true,
          },
        },
      },
    });

    return chapter;
  }

  async findOneWithAll(chapterId: string, studentId: string, courseId: string) {
    const purchase = await this.prisma.purchase.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    const course = await this.prisma.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter || !course)
      throw new NotFoundException('Curso o capítulo no encontrado.');

    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await this.prisma.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      nextChapter = await this.prisma.chapter.findFirst({
        where: {
          courseId,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      });
    }

    const studentProgress = await this.prisma.studentProgress.findUnique({
      where: {
        studentId_chapterId: {
          studentId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      attachments,
      nextChapter,
      studentProgress,
      purchase,
    };
  }

  async update(
    id: string,
    courseId: string,
    updateChapterDto: UpdateChapterDto,
  ) {
    const ownCourse = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    const chapter = this.prisma.chapter.update({
      where: {
        id,
        courseId,
      },
      data: updateChapterDto,
    });

    // TODO: handle video upload

    return chapter;
  }

  async remove(id: string, courseId: string) {
    const ownCourse = this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id,
        courseId,
      },
    });

    if (!chapter) throw new NotFoundException('Capítulo no encontrado.');

    /*
    if (chapter.videoUrl) {
      const existingMuxData = await this.prisma.muxData.findFirst({
        where: {
          chapterId: id,
        },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await this.prisma.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }
      */

    const deletedChapter = await this.prisma.chapter.delete({
      where: {
        id,
      },
    });

    const publishedChaptersInCourse = await this.prisma.chapter.findMany({
      where: {
        courseId,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await this.prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return deletedChapter;
  }

  // Common service
  async findById(id: string) {
    return await this.prisma.chapter.findUnique({
      where: {
        id,
      },
    });
  }
}
