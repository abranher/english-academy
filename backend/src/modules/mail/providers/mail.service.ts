import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { User } from '@prisma/client';
import { totp } from 'otplib';
import { getYear } from 'date-fns';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async sendEmailVerification(user: User) {
    totp.options = { step: 120 };

    const token = totp.generate(this.config.get('OTPLIB_SECRET'));

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verificación de Email',
      template: './email-verification',
      context: {
        title: 'Verificación de Email',
        token,
        companyName: this.config.get('APP_NAME'),
        supportEmail: this.config.get('SUPPORT_MAIL'),
        year: getYear(new Date()),
      },
    });
  }
}
