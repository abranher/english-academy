import { Module } from '@nestjs/common';

import { TutorStatusHistoryService } from './providers/tutor-status-history.service';
import { TutorStatusHistoryController } from './controllers/tutor-status-history.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TutorStatusHistoryController],
  providers: [TutorStatusHistoryService],
})
export class TutorStatusHistoryModule {}
