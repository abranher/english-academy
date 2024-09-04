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

  async findAll() {
    const courses = await this.prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return courses;
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

  async publishCourse(id: string) {
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

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished,
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.levelId ||
      !hasPublishedChapter
    ) {
      return new BadRequestException('Faltan campos obligatorios.');
    }

    const publishedCourse = this.prisma.course.update({
      where: {
        id,
      },
      data: {
        isPublished: true,
      },
    });

    return publishedCourse;
  }

  async unpublishCourse(id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) throw new NotFoundException('Curso no encontrado.');

    const unpublishedCourse = this.prisma.course.update({
      where: {
        id,
      },
      data: {
        isPublished: false,
      },
    });

    return unpublishedCourse;
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
