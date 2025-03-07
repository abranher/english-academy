import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { NotificationType, TutorStatus, User } from '@prisma/client';
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
      await this.toDB(user, status);
      // await this.toMail(user, comment, status);
    } catch (error) {
      console.error('Error creando o enviando notificación:', error);
    }
  }

  async toDB(user: User, status: TutorStatus) {
    await this.prisma.notification.create({
      data: {
        type: NotificationType.UPDATED_TUTOR_STATUS,
        data: {
          heading: 'Nueva actualización del status de tu perfil.',
          message: `Tu perfil ahora tiene status: ${TutorStatusTraduction(status)}.`,
          path: '/tutor/profile',
        },
        userId: user.id,
      },
    });
  }

  async toMail(user: User, comment: string, status: TutorStatus) {
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
