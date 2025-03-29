import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
  getTutorEnrollmentOrders(@Param('tutorId') tutorId: string) {
    return this.enrollmentOrdersService.getTutorEnrollmentOrders(tutorId);
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
