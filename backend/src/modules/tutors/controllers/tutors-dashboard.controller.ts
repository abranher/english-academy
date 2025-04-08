import { Controller, Get, Param } from '@nestjs/common';

import { TutorsDashboardService } from '../providers/tutors-dashboard.service';

@Controller('tutors/dashboard')
export class TutorsDashboardController {
  constructor(private readonly dashboardService: TutorsDashboardService) {}

  @Get('analytics/earnings/tutor/:tutorId')
  async getEarningsAnalytics(@Param('tutorId') tutorId: string) {
    return this.dashboardService.getTutorEarningsAnalytics(tutorId);
  }

  @Get('analytics/active-students/tutor/:tutorId')
  async getActiveStudentsAnalytics(@Param('tutorId') tutorId: string) {
    return this.dashboardService.getActiveStudentsAnalytics(tutorId);
  }

  @Get('analytics/courses-stats/tutor/:tutorId')
  async getCoursesStats(@Param('tutorId') tutorId: string) {
    return this.dashboardService.getCoursesStats(tutorId);
  }

  /*
   * For charts
   */
  @Get('charts/monthly-revenue/tutor/:tutorId')
  async getMonthlyRevenue(@Param('tutorId') tutorId: string) {
    return this.dashboardService.getTutorMonthlyRevenue(tutorId);
  }

  @Get('charts/courses-students/tutor/:tutorId')
  async getCoursesStudents(@Param('tutorId') tutorId: string) {
    return this.dashboardService.getTutorCoursesStudents(tutorId);
  }
}
