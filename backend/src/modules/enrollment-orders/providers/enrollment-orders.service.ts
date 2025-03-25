import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { CreateEnrollmentOrderDto } from '../dto/create-enrollment-order.dto';

@Injectable()
export class EnrollmentOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async create(
    studentId: string,
    courseId: string,
    createEnrollmentOrderDto: CreateEnrollmentOrderDto,
  ) {
    await this.InfrastructureService.findStudentOrThrow(studentId);
    await this.InfrastructureService.findCourseOrThrow(courseId);

    try {
      const enrollmentOrder = await this.prisma.enrollmentOrder.create({
        data: {
          enrollmentPrice: createEnrollmentOrderDto.enrollmentPrice,
          paymentReference: createEnrollmentOrderDto.paymentReference,
          studentId,
          courseId,
        },
      });

      await this.prisma.enrollment.create({
        data: {
          studentId,
          courseId,
          purchasedPrice: createEnrollmentOrderDto.enrollmentPrice,
          enrollmentOrderId: enrollmentOrder.id,
        },
      });

      return { message: 'Orden de inscripción creada exitosamente!' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
