import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { EnrollmentOrdersService } from '../providers/enrollment-orders.service';
import { CreateEnrollmentOrderDto } from '../dto/create-enrollment-order.dto';
import { EnrollmentOrderStatus } from '@prisma/client';

@Controller('enrollment-orders')
export class EnrollmentOrdersController {
  constructor(
    private readonly enrollmentOrdersService: EnrollmentOrdersService,
  ) {}

  /*
   * Get enrollment orders
   */
  @Get('student/:studentId')
  findAll(@Param('studentId') studentId: string) {
    return this.enrollmentOrdersService.findAll(studentId);
  }

  /*
   * Get one enrollment order
   */
  @Get(':id/student/:studentId')
  findOne(@Param('id') id: string, @Param('studentId') studentId: string) {
    return this.enrollmentOrdersService.findOne(id, studentId);
  }

  /*
   * Get enrollment orders by status
   */
  @Get('status/:status/student/:studentId')
  findAllByStatus(
    @Param('status') status: EnrollmentOrderStatus,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentOrdersService.findAllByStatus(status, studentId);
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
