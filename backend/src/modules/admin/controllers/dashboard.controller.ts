import { Controller, Get } from '@nestjs/common';

import { DashboardService } from '../providers/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview/insights-cards')
  insightsCards() {
    return this.dashboardService.insightsCards();
  }
}
