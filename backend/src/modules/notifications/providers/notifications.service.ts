import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { User } from '@prisma/client';
import { getYear } from 'date-fns';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { TutorStatusTraduction } from 'src/libs/enum-translations';

@Injectable()
export class NotificationsService {
  constructor(
    private mailerService: MailerService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async statusUpdateTutor(user: User, comment: string) {
    const tutor = await this.prisma.tutor.findUnique({
      where: { userId: user.id },
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Actualización de Status del Tutor',
      template: './status-update-tutor',
      context: {
        title: 'Actualización de Status',
        fullName: `${user.name} ${user.lastName}`,
        status: TutorStatusTraduction(tutor.status),
        comment,
        companyName: this.config.get('APP_NAME'),
        supportEmail: this.config.get('SUPPORT_MAIL'),
        year: getYear(new Date()),
      },
    });
  }
}
