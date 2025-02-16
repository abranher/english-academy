import { Module } from '@nestjs/common';
import { NotificationsService } from './providers/notifications.service';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
