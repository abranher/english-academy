import { Controller, Get, Param } from '@nestjs/common';

import { TutorsDashboardService } from '../providers/tutors-dashboard.service';

@Controller('tutors/dashboard')
export class TutorsDashboardController {
  constructor(
    private readonly tutorsDashboardService: TutorsDashboardService,
  ) {}

  @Get('analytics/earnings/tutor/:tutorId')
  async getEarningsAnalytics(@Param('tutorId') tutorId: string) {
    return this.tutorsDashboardService.getTutorEarningsAnalytics(tutorId);
  }

  @Get('analytics/active-students/tutor/:tutorId')
  async getActiveStudentsAnalytics(@Param('tutorId') tutorId: string) {
    return this.tutorsDashboardService.getActiveStudentsAnalytics(tutorId);
  }
}
