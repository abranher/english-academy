import { Module } from '@nestjs/common';

import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './providers/dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class AdminModule {}
