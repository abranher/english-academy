import { Module } from '@nestjs/common';

import { NotificationsService } from './providers/notifications.service';
import { NotificationsController } from './controllers/notifications.controller';
import { WelcomeNotificationStrategy } from './strategies/welcome.notification.strategy';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, WelcomeNotificationStrategy],
  exports: [NotificationsService],
})
export class NotificationsModule {}
