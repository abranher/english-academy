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

  async markAsRead(id: string) {
    try {
      return await this.prisma.notification.update({
        where: { id },
        data: { readAt: new Date() },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marcando como leída la notificacion: ',
        error,
      );
    }
  }
}
