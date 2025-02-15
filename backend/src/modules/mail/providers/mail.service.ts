import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: { email: string; name: string }) {
    console.log(process.cwd());
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
}
