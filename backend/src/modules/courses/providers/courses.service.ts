import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { ActivityLogsService } from 'src/modules/activity-logs/providers/activity-logs.service';
import { activityLogMessages } from 'src/libs/activity-logs';
import { CourseReviewStatus } from '@prisma/client';

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

    return { message: 'Curso creado!', course };
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

  async findAllWithPendingReview() {
    const courses = await this.prisma.course.findMany({
      where: {
        reviewStatus: CourseReviewStatus.PENDING_REVIEW,
      },
      include: {
        tutor: {
          include: {
            user: true,
          },
        },
      },
    });

    return courses.map((course) => {
      const { tutor, ...rest } = course;
      return {
        ...rest,
        tutorUsername: tutor.user.username,
      };
    });
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
    try {
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
    } catch (error) {
      console.error('Error obteniendo el curso:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.prisma.course.update({
        where: {
          id,
        },
        data: updateCourseDto,
      });

      return course;
    } catch (error) {
      console.log(error);
    }
  }

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
}
