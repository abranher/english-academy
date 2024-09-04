import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
        muxData: true,
      },
    });

    return chapter;
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

  async publishChapter(id: string, courseId: string) {
    const ownCourse = await this.prisma.course.findUnique({
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

    /*
    const muxData = this.prisma.muxData.findUnique({
      where: {
        chapterId: id,
      },
    });

    */

    if (
      !chapter ||
      //!muxData ||
      !chapter.title ||
      !chapter.description
      // !chapter.videoUrl
    ) {
      throw new BadRequestException('Faltan campos obligatorios.');
    }

    const publishedChapter = this.prisma.chapter.update({
      where: {
        id,
        courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return publishedChapter;
  }

  async unpublishChapter(id: string, courseId: string) {
    const ownCourse = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    const unpublishedChapter = this.prisma.chapter.update({
      where: {
        id,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedChaptersInCourse = await this.prisma.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
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

    return unpublishedChapter;
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
        isPublished: true,
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
