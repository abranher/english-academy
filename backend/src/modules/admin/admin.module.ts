import { Module } from '@nestjs/common';

import { AdminController } from './controllers/admin.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { AdminService } from './providers/admin.service';
import { DashboardService } from './providers/dashboard.service';

@Module({
  controllers: [AdminController, DashboardController],
  providers: [AdminService, DashboardService],
})
export class AdminModule {}
