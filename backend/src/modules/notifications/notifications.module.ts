import { Global, Module } from '@nestjs/common';

import { NotificationsService } from './providers/notifications.service';
import { NotificationsController } from './controllers/notifications.controller';
import { UpdatedTutorStatus } from './class/updated-tutor-status';
import { NotificationsGateway } from './gateways/notifications.gateway';

@Global()
@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway, UpdatedTutorStatus],
  exports: [NotificationsService, UpdatedTutorStatus],
})
export class NotificationsModule {}
