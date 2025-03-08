import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CourseReviewStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class CoursesAdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.course.findMany({
        include: { tutor: { include: { user: true } } },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los cursos:',
        error,
      );
    }
  }

  async findByStatus(status: CourseReviewStatus) {
    try {
      if (status === CourseReviewStatus.DRAFT)
        return await this.prisma.course.findMany({
          where: { reviewStatus: CourseReviewStatus.DRAFT },
          include: { tutor: { include: { user: true } } },
        });
      else if (status === CourseReviewStatus.PENDING_REVIEW)
        return await this.prisma.course.findMany({
          where: { reviewStatus: CourseReviewStatus.PENDING_REVIEW },
          include: { tutor: { include: { user: true } } },
        });
      else if (status === CourseReviewStatus.NEEDS_REVISION)
        return await this.prisma.course.findMany({
          where: { reviewStatus: CourseReviewStatus.NEEDS_REVISION },
          include: { tutor: { include: { user: true } } },
        });
      else if (status === CourseReviewStatus.APPROVED)
        return await this.prisma.course.findMany({
          where: { reviewStatus: CourseReviewStatus.APPROVED },
          include: { tutor: { include: { user: true } } },
        });
      else if (status === CourseReviewStatus.REJECTED)
        return await this.prisma.course.findMany({
          where: { reviewStatus: CourseReviewStatus.REJECTED },
          include: { tutor: { include: { user: true } } },
        });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los cursos:',
        error,
      );
    }
  }
}
