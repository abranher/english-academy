import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateCourseEnrollmentOrderDto } from '../dto/create-course-enrollment-order.dto';

@Injectable()
export class CourseEnrollmentOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    studentId: string,
    createCourseEnrollmentOrderDto: CreateCourseEnrollmentOrderDto,
  ) {
    const { courses } = createCourseEnrollmentOrderDto;

    const purchaseOrder = await this.prisma.courseEnrollmentOrder.create({
      data: {
        total: createCourseEnrollmentOrderDto.total,
        paymentReference: parseInt(
          createCourseEnrollmentOrderDto.paymentReference,
        ),
        studentId,
      },
    });

    for (const { courseId } of courses) {
      await this.prisma.courseEnrollment.create({
        data: {
          studentId,
          courseEnrollmentOrderId: purchaseOrder.id,
          courseId,
          purchasedPrice: createCourseEnrollmentOrderDto.total,
        },
      });
    }

    return { message: 'Pago procesado correctamente' };
  }
}
