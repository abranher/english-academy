import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserNotifications(userId: string) {
    try {
      return await this.prisma.notification.findMany({
        where: { userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error obteniendo notificationes: ',
        error,
      );
    }
  }
}
