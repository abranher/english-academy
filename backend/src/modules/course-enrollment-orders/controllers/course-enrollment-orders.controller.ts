import { Controller, Post, Body, Param } from '@nestjs/common';

import { CourseEnrollmentOrdersService } from '../providers/course-enrollment-orders.service';
import { CreateCourseEnrollmentOrderDto } from '../dto/create-course-enrollment-order.dto';

@Controller('course-enrollment-orders')
export class CourseEnrollmentOrdersController {
  constructor(
    private readonly courseEnrollmentOrdersService: CourseEnrollmentOrdersService,
  ) {}

  @Post('student/:studentId')
  create(
    @Param('studentId') studentId: string,
    @Body() createCourseEnrollmentOrderDto: CreateCourseEnrollmentOrderDto,
  ) {
    return this.courseEnrollmentOrdersService.create(
      studentId,
      createCourseEnrollmentOrderDto,
    );
  }
}
