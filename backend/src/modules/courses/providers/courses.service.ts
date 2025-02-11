import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ActivityLogsService } from 'src/modules/activity-logs/providers/activity-logs.service';
import { activityLogMessages } from 'src/libs/activity-logs';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLogsService: ActivityLogsService,
  ) {}

  async create(
    tutorId: string,
    createCourseDto: CreateCourseDto,
    userHeader: string,
  ) {
    const course = await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        tutorId,
      },
    });

    this.activityLogsService.create(
      userHeader,
      activityLogMessages['course_create'],
    );

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

  async uploadImage(id: string, image: string) {
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        image,
      },
    });

    return course;
  }

  async findAll() {
    const courses = await this.prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        chapters: true,
        price: true,
        category: true,
        subcategory: true,
      },
    });

    return courses;
  }

  async findCoursesFromTutor(tutorId: string) {
    const courses = await this.prisma.course.findMany({
      where: {
        tutorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        chapters: true,
        price: true,
        category: true,
        subcategory: true,
      },
    });

    const coursesData = courses.map((course) => ({
      ...course,
      price: course.price?.amount,
    }));

    return coursesData;
  }

  async findOne(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        subcategory: true,
        price: true,
        chapters: {
          orderBy: {
            position: 'asc',
          },
          include: {
            lessons: {
              include: {
                class: true,
                quiz: true,
              },
            },
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

  /* async publishCourse(id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: true,
      },
    });

    if (!course) throw new NotFoundException('Curso no encontrado.');

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished,
    );

    if (
      !course.title ||
      !course.description ||
      !course.image ||
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

  */

  async updateProgress(id: string, chapterId: string, data: any) {
    const studentProgress = await this.prisma.studentProgress.upsert({
      where: {
        studentId_chapterId: {
          studentId: '',
          chapterId,
        },
      },
      update: {
        isCompleted: data.isCompleted,
      },
      create: {
        studentId: '',
        chapterId,
        isCompleted: data.isCompleted,
      },
    });

    return studentProgress;
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: true,
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
