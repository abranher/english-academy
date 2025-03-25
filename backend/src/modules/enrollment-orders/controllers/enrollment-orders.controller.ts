import { Body, Controller, Param, Post } from '@nestjs/common';

import { EnrollmentOrdersService } from '../providers/enrollment-orders.service';
import { CreateEnrollmentOrderDto } from '../dto/create-enrollment-order.dto';

@Controller('enrollment-orders')
export class EnrollmentOrdersController {
  constructor(
    private readonly enrollmentOrdersService: EnrollmentOrdersService,
  ) {}

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
