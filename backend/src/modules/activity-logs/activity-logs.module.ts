import { Module } from '@nestjs/common';
import { ActivityLogsService } from './providers/activity-logs.service';
import { ActivityLogsController } from './controllers/activity-logs.controller';

@Module({
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService],
  exports: [ActivityLogsService],
})
export class ActivityLogsModule {}
