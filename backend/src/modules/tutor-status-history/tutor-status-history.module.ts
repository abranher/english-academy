import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { TutorStatusHistoryController } from './controllers/tutor-status-history.controller';
import { TutorStatusHistoryAdminController } from './controllers/tutor-status-history.admin.controller';
import { TutorStatusHistoryService } from './providers/tutor-status-history.service';
import { TutorStatusHistoryAdminService } from './providers/tutor-status-history.admin.service';

@Module({
  imports: [UsersModule],
  controllers: [
    TutorStatusHistoryController,
    TutorStatusHistoryAdminController,
  ],
  providers: [TutorStatusHistoryService, TutorStatusHistoryAdminService],
})
export class TutorStatusHistoryModule {}
