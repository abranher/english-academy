import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { totp } from 'otplib';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async sendUserConfirmation(user: { email: string; name: string }) {
    console.log(__dirname);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome', // ✅ template found again in v1.6.0
      context: {
        title: 'Nueva Actualización',
        headerTitle: 'Academy',
        name: user.name,
        content: '<p>Gracias por ser parte de nuestra comunidad...</p>',
        buttonUrl: 'https://ejemplo.com/accion',
        buttonText: 'Ver Más',
        supportEmail: 'soporte@empresa.com',
        year: new Date().getFullYear(),
        companyName: 'Academy S.A.',
      },
    });
  }

  async sendEmailVerification(user: User) {
    totp.options = {
      step: 120,
    };

    const token = totp.generate(this.config.get('OTPLIB_SECRET'));

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verificación de Email',
      template: './email-verification',
      context: {
        title: 'Verificación de Email',
        token,
        companyName: this.config.get('APP_NAME'),
        supportEmail: 'soporte@empresa.com',
        year: new Date().getFullYear(),
      },
    });
  }
}
