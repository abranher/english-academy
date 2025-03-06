import { Global, Module } from '@nestjs/common';

import { NotificationsService } from './providers/notifications.service';
import { NotificationsController } from './controllers/notifications.controller';
import { UpdatedTutorStatus } from './class/updated-tutor-status';

@Global()
@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, UpdatedTutorStatus],
  exports: [NotificationsService, UpdatedTutorStatus],
})
export class NotificationsModule {}
