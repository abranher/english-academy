import { Controller, Get, Param } from '@nestjs/common';

import { CourseEnrollmentsService } from '../providers/course-enrollments.service';

@Controller('course-enrollments')
export class CourseEnrollmentsController {
  constructor(
    private readonly courseEnrollmentsService: CourseEnrollmentsService,
  ) {}

  @Get('student/:studentId')
  findAll(@Param('studentId') studentId: string) {
    return this.courseEnrollmentsService.findAll(studentId);
  }

  @Get('course/:courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.courseEnrollmentsService.findOne(courseId);
  }
}
