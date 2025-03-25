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
   * Get Course Enrollment Tutors
   */
  @Get('student/:studentId/tutors')
  findAllTutors(@Param('studentId') studentId: string) {
    return this.enrollmentsService.findAllTutors(studentId);
  }
}
