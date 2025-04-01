import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

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
            include: {
              category: true,
              subcategory: true,
              level: true,
              chapters: {
                include: {
                  lessons: {
                    include: {
                      class: {
                        include: { classProgress: { where: { studentId } } },
                      },
                      quiz: {
                        include: { quizProgress: { where: { studentId } } },
                      },
                    },
                  },
                },
              },
            },
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

  async getMetrics(studentId: string, courseId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);
    await this.InfrastructureService.findCourseOrThrow(courseId);

    try {
      // Get all lessons for the course
      const chapters = await this.prisma.chapter.findMany({
        where: { courseId },
        include: { lessons: { include: { class: true, quiz: true } } },
      });

      // Flatten all lessons from all chapters
      const allLessons = chapters.flatMap((chapter) => chapter.lessons);

      // Get class progress for all classes in the course
      const classProgress = await this.prisma.classProgress.findMany({
        where: {
          studentId,
          classId: {
            in: allLessons
              .filter((lesson) => lesson.type === 'CLASS')
              .map((lesson) => lesson.class.id),
          },
          isCompleted: true,
        },
      });

      // Get quiz progress for all quizzes in the course
      const quizProgress = await this.prisma.quizProgress.findMany({
        where: {
          studentId,
          quizId: {
            in: allLessons
              .filter((lesson) => lesson.type === 'QUIZ')
              .map((lesson) => lesson.quiz.id),
          },
          isCompleted: true,
        },
      });

      // Calculate total points from completed quizzes
      const totalPoints = quizProgress.reduce(
        (sum, quiz) => sum + (quiz.earnedPoints || 0),
        0,
      );

      return {
        completedClasses: classProgress.length,
        completedQuizzes: quizProgress.length,
        totalPoints,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findChapter(studentId: string, chapterId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);
    await this.InfrastructureService.findChapterOrThrow(chapterId);

    try {
      return await this.prisma.chapter.findUnique({
        where: { id: chapterId },
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
}
