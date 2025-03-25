import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { LessonType } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { NavItemDto } from '../dto/nav-item.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async findAll(studentId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);

    try {
      return await this.prisma.enrollment.findMany({
        where: { studentId, isActive: true },
        include: {
          course: {
            include: { category: true, subcategory: true, level: true },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findOne(studentId: string, courseId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);
    await this.InfrastructureService.findCourseOrThrow(courseId);

    try {
      return await this.prisma.enrollment.findUnique({
        where: { studentId_courseId: { studentId, courseId } },
        include: {
          course: {
            include: { category: true, subcategory: true, level: true },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findAllTutors(studentId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);

    try {
      return await this.prisma.tutor.findMany({
        where: {
          courses: {
            some: { enrollments: { some: { studentId: studentId } } },
          },
        },
        include: { user: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async getCourseProgressNav(
    studentId: string,
    courseId: string,
  ): Promise<NavItemDto[]> {
    await this.InfrastructureService.findCourseOrThrow(courseId);

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        chapters: {
          orderBy: { position: 'asc' },
          include: {
            lessons: {
              orderBy: { position: 'asc' },
              include: {
                class: { include: { classProgress: { where: { studentId } } } },
                quiz: { include: { quizProgress: { where: { studentId } } } },
              },
            },
          },
        },
      },
    });

    return course.chapters.map((chapter): NavItemDto => {
      let chapterCompleted = true;
      const subItems: NavItemDto[] = [];

      chapter.lessons.forEach((lesson) => {
        if (lesson.type === LessonType.CLASS && lesson.class) {
          const completed =
            lesson.class.classProgress.length > 0 &&
            lesson.class.classProgress[0].isCompleted;
          if (!completed) chapterCompleted = false;

          subItems.push({
            id: lesson.class.id,
            title: lesson.class.title,
            type: 'class',
            completed,
            courseId,
            chapterId: chapter.id,
            lessonId: lesson.id,
          });
        } else if (lesson.type === LessonType.QUIZ && lesson.quiz) {
          const completed =
            lesson.quiz.quizProgress.length > 0 &&
            lesson.quiz.quizProgress[0].isCompleted;
          if (!completed) chapterCompleted = false;

          subItems.push({
            id: lesson.quiz.id,
            title: lesson.quiz.title,
            type: 'quiz',
            completed,
            courseId,
            chapterId: chapter.id,
            lessonId: lesson.id,
          });
        }
      });

      return {
        id: chapter.id,
        title: chapter.title,
        type: 'chapter',
        completed: chapterCompleted,
        courseId,
        subItems,
      };
    });
  }
}
