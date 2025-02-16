import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from '../providers/notifications.service';
import { WelcomeNotificationDto } from '../dto/welcome-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Post('welcome')
  async sendWelcome(@Body() dto: WelcomeNotificationDto) {
    return this.notifications.createNotification(
      'welcome',
      dto.userId,
      dto, // Datos específicos
    );
  }
}
