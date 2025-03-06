import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { TutorStatus, User } from '@prisma/client';
import { getYear } from 'date-fns';
import { TutorStatusTraduction } from 'src/libs/enum-translations';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class UpdatedTutorStatus {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async send(user: User, comment: string, status: TutorStatus) {
    try {
      await this.db(user, comment, status);
      await this.mail(user, comment, status);
    } catch (error) {
      console.error('Error creando o enviando notificación:', error);
    }
  }

  async db(user: User, comment: string, status: TutorStatus) {
    await this.prisma.notification.create({
      data: {
        type: 'updated-tutor-status',
        data: {
          message: 'hola',
          comment,
          status,
        },
        userId: user.id,
      },
    });
  }

  async mail(user: User, comment: string, status: TutorStatus) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Actualización de Status del Tutor',
      template: './status-update-tutor',
      context: {
        title: 'Actualización de Status',
        fullName: `${user.name} ${user.lastName}`,
        status: TutorStatusTraduction(status),
        comment,
        companyName: this.config.get('APP_NAME'),
        supportEmail: this.config.get('SUPPORT_MAIL'),
        year: getYear(new Date()),
      },
    });
  }
}
