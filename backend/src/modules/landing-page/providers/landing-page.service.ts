import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CoursePlatformStatus, CourseReviewStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class LandingPageService {
  constructor(private readonly prisma: PrismaService) {}

  async getCourses() {
    try {
      return await this.prisma.course.findMany({
        where: {
          reviewStatus: CourseReviewStatus.APPROVED,
          platformStatus: CoursePlatformStatus.PUBLISHED,
        },
        include: {
          price: true,
          category: true,
          subcategory: true,
          tutor: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error obteniendo los cursos',
        error,
      );
    }
  }

  async getPlans() {
    try {
      return await this.prisma.plan.findMany({
        where: { isActive: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error obteniendo los planes',
        error,
      );
    }
  }
}
