import { Controller, Get, Param } from '@nestjs/common';

import { EnrollmentsService } from '../providers/enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('student/:studentId')
  findAll(@Param('studentId') studentId: string) {
    return this.enrollmentsService.findAll(studentId);
  }
}
