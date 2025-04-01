import { Controller, Get, Param } from '@nestjs/common';

import { EnrollmentsService } from '../providers/enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  /*
   * Get All Enrollments
   */
  @Get('student/:studentId')
  findAll(@Param('studentId') studentId: string) {
    return this.enrollmentsService.findAll(studentId);
  }

  /*
   * Get Enrollment One
   */
  @Get('student/:studentId/course/:courseId')
  findOne(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.enrollmentsService.findOne(studentId, courseId);
  }

  @Get('metrics/student/:studentId/course/:courseId')
  async getMetrics(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.enrollmentsService.getMetrics(studentId, courseId);
  }

  /*
   * Get Enrollment One
   */
  @Get('student/:studentId/chapter/:chapterId')
  findChapter(
    @Param('studentId') studentId: string,
    @Param('chapterId') chapterId: string,
  ) {
    return this.enrollmentsService.findChapter(studentId, chapterId);
  }

  /*
   * Get Course Enrollment Tutors
   */
  @Get('student/:studentId/tutors')
  findAllTutors(@Param('studentId') studentId: string) {
    return this.enrollmentsService.findAllTutors(studentId);
  }
}
