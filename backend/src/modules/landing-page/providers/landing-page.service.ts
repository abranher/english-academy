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
      });
    } catch (error) {
      throw new InternalServerErrorException('Error obteniendo los cursos');
    }
  }
}
