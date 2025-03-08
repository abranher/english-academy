import { Controller, Get } from '@nestjs/common';

import { CoursesLandingService } from '../providers/courses.landing.service';

@Controller('courses/landing')
export class CoursesLandingController {
  constructor(private readonly coursesLandingService: CoursesLandingService) {}

  @Get()
  findAll() {
    return this.coursesLandingService.findAll();
  }
}
