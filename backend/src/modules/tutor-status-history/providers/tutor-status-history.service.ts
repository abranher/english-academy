import { Injectable, NotFoundException } from '@nestjs/common';
import { TutorStatus } from '@prisma/client';

import { NotificationsService } from 'src/modules/notifications/providers/notifications.service';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UsersService } from 'src/modules/users/providers/users.service';

@Injectable()
export class TutorStatusHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly userService: UsersService,
  ) {}

  private async findUserOrThrow(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async resubmittedAt(id: string, userId: string) {
    const user = await this.findUserOrThrow(userId);
    const currentTutor = await this.prisma.tutor.findUniqueOrThrow({
      where: { userId: user.id },
    });

    await this.prisma.tutorStatusHistory.update({
      where: { id: id, tutorId: currentTutor.id },
      data: { resubmittedAt: new Date() },
    });

    await this.prisma.tutor.update({
      where: { id: currentTutor.id, userId: user.id },
      data: { status: TutorStatus.RESUBMITTED },
    });

    /*
      try {
        await this.notifications.statusUpdateTutor(
          user,
          tutorStatusHistory.comment,
          tutorUpdated.status,
        );
      } catch (error) {
        console.error('Error enviando notificación:', error);
      }
      */

    return { message: 'Reenviado exitosamente.' };
  }
}
