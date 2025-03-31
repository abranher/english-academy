import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { EnrollmentOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { CreateEnrollmentOrderDto } from '../dto/create-enrollment-order.dto';

@Injectable()
export class EnrollmentOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async findAll(studentId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);

    try {
      return await this.prisma.enrollmentOrder.findMany({
        where: { studentId },
        include: { course: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findOne(id: string, studentId: string) {
    await this.InfrastructureService.findEnrollmentOrderOrThrow(id);
    await this.InfrastructureService.findStudentOrThrow(studentId);

    try {
      return await this.prisma.enrollmentOrder.findUnique({
        where: { id, studentId },
        include: {
          course: {
            include: { price: true, category: true, subcategory: true },
          },
          enrollmentOrderHistory: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findAllByStatus(status: EnrollmentOrderStatus, studentId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);

    try {
      return await this.prisma.enrollmentOrder.findMany({
        where: { studentId, status },
        include: { course: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

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
