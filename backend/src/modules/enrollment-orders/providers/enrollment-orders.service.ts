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

  async getTutorEnrollmentOrders(tutorId: string) {
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
