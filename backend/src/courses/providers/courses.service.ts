import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
      },
    });

    return course;
  }

  async createAttachment(id: string, url: string) {
    const courseOwner = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!courseOwner) throw new NotFoundException('Curso no encontrado.');

    const attachment = await this.prisma.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId: id,
      },
    });

    return attachment;
  }

  async uploadImage(id: string, imageUrl: string) {
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        imageUrl,
      },
    });

    return course;
  }

  findAll() {
    return `This action returns all courses`;
  }

  async findOne(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          orderBy: {
            position: 'asc',
          },
        },
        attachments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: updateCourseDto,
    });

    return course;
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

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) throw new NotFoundException('Curso no encontrado.');

    /*
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }
    */

    const deletedCourse = await this.prisma.course.delete({
      where: {
        id,
      },
    });

    return deletedCourse;
  }

  async removeAttachment(id: string, attachmentId: string) {
    const courseOwner = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!courseOwner) throw new NotFoundException('Curso no encontrado.');

    const attachment = await this.prisma.attachment.delete({
      where: {
        id: attachmentId,
        courseId: id,
      },
    });

    return attachment;
  }
}
