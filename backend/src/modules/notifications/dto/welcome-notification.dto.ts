import { IsString, IsUrl } from 'class-validator';

export class WelcomeNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  userName: string;

  @IsUrl()
  ctaUrl: string;
}
