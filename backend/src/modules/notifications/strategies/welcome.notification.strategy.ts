import { WelcomeNotificationDto } from '../dto/welcome-notification.dto';
import { BaseNotificationStrategy } from './base.notification.strategy';

export class WelcomeNotificationStrategy extends BaseNotificationStrategy<WelcomeNotificationDto> {
  readonly type = 'welcome';
  readonly emailTemplate = 'welcome';
  readonly dataDto = WelcomeNotificationDto;
  protected shouldSendEmail(): boolean {
    return true; // Siempre envía email
  }

  getEmailSubject(data: WelcomeNotificationDto): string {
    return `¡Bienvenido ${data.userName}!`;
  }

  getEmailContext(data: WelcomeNotificationDto): object {
    return {
      userName: data.userName,
      ctaUrl: data.ctaUrl,
    };
  }
}
