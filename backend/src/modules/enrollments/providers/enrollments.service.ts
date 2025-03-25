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
