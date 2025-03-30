import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { EnrollmentOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

@Injectable()
export class TutorOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async findAllForTutor(tutorId: string) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    try {
      const courses = await this.prisma.course.findMany({
        where: { tutorId },
        select: { id: true },
      });

      const courseIds = courses.map((course) => course.id);

      return await this.prisma.enrollmentOrder.findMany({
        where: { courseId: { in: courseIds } },
        include: { student: { include: { user: true } }, course: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findAllForTutorByStatus(
    status: EnrollmentOrderStatus,
    tutorId: string,
  ) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    try {
      const courses = await this.prisma.course.findMany({
        where: { tutorId },
        select: { id: true },
      });

      const courseIds = courses.map((course) => course.id);

      return await this.prisma.enrollmentOrder.findMany({
        where: { courseId: { in: courseIds }, status },
        include: { student: { include: { user: true } }, course: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
