import { Controller, Get, Param } from '@nestjs/common';

import { TutorStatus } from '@prisma/client';

import { TutorCoursesService } from '../providers/tutor.courses.service';

@Controller('tutors/courses/list')
export class TutorCoursesController {
  constructor(private readonly tutorCoursesService: TutorCoursesService) {}

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    return this.tutorCoursesService.findAll(userId);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: TutorStatus) {
    return this.tutorCoursesService.findByStatus(status);
  }

  // Get tutor for description in dashboard
  @Get('user/:userId')
  async findUserTutor(@Param('userId') userId: string) {
    return this.tutorCoursesService.findUserTutor(userId);
  }
}
