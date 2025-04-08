import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CourseReviewStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class TutorCoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    try {
      const user = await this.findUserTutor(userId);

      const tutor = await this.prisma.tutor.findUnique({
        where: { userId: user.id },
      });

      return await this.prisma.course.findMany({
        where: { tutorId: tutor.id },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los cursos:',
        error,
      );
    }
  }

  async findByStatus(userId: string, status: CourseReviewStatus) {
    try {
      const user = await this.findUserTutor(userId);

      const tutor = await this.prisma.tutor.findUnique({
        where: { userId: user.id },
      });

      if (status === CourseReviewStatus.DRAFT)
        return await this.prisma.course.findMany({
          where: { tutorId: tutor.id, reviewStatus: CourseReviewStatus.DRAFT },
        });
      else if (status === CourseReviewStatus.PENDING_REVIEW)
        return await this.prisma.course.findMany({
          where: {
            tutorId: tutor.id,
            reviewStatus: CourseReviewStatus.PENDING_REVIEW,
          },
        });
      else if (status === CourseReviewStatus.NEEDS_REVISION)
        return await this.prisma.course.findMany({
          where: {
            tutorId: tutor.id,
            reviewStatus: CourseReviewStatus.NEEDS_REVISION,
          },
        });
      else if (status === CourseReviewStatus.APPROVED)
        return await this.prisma.course.findMany({
          where: {
            tutorId: tutor.id,
            reviewStatus: CourseReviewStatus.APPROVED,
          },
        });
      else if (status === CourseReviewStatus.REJECTED)
        return await this.prisma.course.findMany({
          where: {
            tutorId: tutor.id,
            reviewStatus: CourseReviewStatus.REJECTED,
          },
        });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los cursos:',
        error,
      );
    }
  }

  async findUserTutor(userId: string) {
    const tutorUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!tutorUser) throw new NotFoundException('Usuario no encontrado.');

    return tutorUser;
  }
}
