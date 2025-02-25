import { Controller, Get } from '@nestjs/common';

import { DashboardService } from '../providers/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview/info-cards')
  infoCards() {
    return this.dashboardService.infoCards();
  }

  @Get('overview/monthly-registrations')
  async getMonthlyRegistrations() {
    return this.dashboardService.getMonthlyRegistrations();
  }
}
