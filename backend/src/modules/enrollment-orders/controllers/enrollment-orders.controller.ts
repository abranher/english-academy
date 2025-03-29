import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { EnrollmentOrderStatus } from '@prisma/client';

import { EnrollmentOrdersService } from '../providers/enrollment-orders.service';
import { CreateEnrollmentOrderDto } from '../dto/create-enrollment-order.dto';

@Controller('enrollment-orders')
export class EnrollmentOrdersController {
  constructor(
    private readonly enrollmentOrdersService: EnrollmentOrdersService,
  ) {}

  /*
   * Get tutor enrollment orders
   */
  @Get('tutor/:tutorId')
  findAllForTutor(@Param('tutorId') tutorId: string) {
    return this.enrollmentOrdersService.findAllForTutor(tutorId);
  }

  /*
   * Get tutor enrollment orders
   */
  @Get('status/:status/tutor/:tutorId')
  findAllForTutorByStatus(
    @Param('status') status: EnrollmentOrderStatus,
    @Param('tutorId') tutorId: string,
  ) {
    return this.enrollmentOrdersService.findAllForTutorByStatus(
      status,
      tutorId,
    );
  }

  /*
   * Create Enrollment Order
   */
  @Post('student/:studentId/course/:courseId')
  create(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
    @Body() createEnrollmentOrderDto: CreateEnrollmentOrderDto,
  ) {
    return this.enrollmentOrdersService.create(
      studentId,
      courseId,
      createEnrollmentOrderDto,
    );
  }
}
