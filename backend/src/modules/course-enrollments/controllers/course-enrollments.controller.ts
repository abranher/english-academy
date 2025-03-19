import { Controller } from '@nestjs/common';

import { CourseEnrollmentsService } from '../providers/course-enrollments.service';

@Controller('course-enrollments')
export class CourseEnrollmentsController {
  constructor(
    private readonly courseEnrollmentsService: CourseEnrollmentsService,
  ) {}
}
