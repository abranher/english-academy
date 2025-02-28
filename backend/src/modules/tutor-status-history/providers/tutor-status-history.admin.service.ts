import { Injectable, NotFoundException } from '@nestjs/common';

import { NotificationsService } from 'src/modules/notifications/providers/notifications.service';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { CreateTutorStatusHistoryDto } from '../dto/create-tutor-status-history.dto';

@Injectable()
export class TutorStatusHistoryAdminService {
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

  async create(
    userId: string,
    createTutorStatusHistoryDto: CreateTutorStatusHistoryDto,
  ) {
    const user = await this.findUserOrThrow(userId);
    const currentTutor = await this.prisma.tutor.findUniqueOrThrow({
      where: { userId: user.id },
    });

    const tutorStatusHistory = await this.prisma.tutorStatusHistory.create({
      data: {
        comment: createTutorStatusHistoryDto.comment,
        previousStatus: currentTutor.status,
        tutorId: currentTutor.id,
      },
    });

    const tutorUpdated = await this.prisma.tutor.update({
      where: { id: currentTutor.id, userId: user.id },
      data: { status: createTutorStatusHistoryDto.status },
    });

    try {
      await this.notifications.statusUpdateTutor(
        user,
        tutorStatusHistory.comment,
        tutorUpdated.status,
      );
    } catch (error) {
      console.error('Error enviando notificación:', error);
    }

    return { message: 'Tutor actualizado.' };
  }
}
