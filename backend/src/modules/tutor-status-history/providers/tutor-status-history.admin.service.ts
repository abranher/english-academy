import { Injectable, NotFoundException } from '@nestjs/common';

import { NotificationsService } from 'src/modules/notifications/providers/notifications.service';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { CreateTutorStatusHistoryDto } from '../dto/create-tutor-status-history.dto';
import { UpdatedTutorStatus } from 'src/modules/notifications/class/updated-tutor-status';
import { TutorStatus, TutorStatusDecision } from '@prisma/client';

@Injectable()
export class TutorStatusHistoryAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly updatedTutorStatus: UpdatedTutorStatus,
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

    if (createTutorStatusHistoryDto.status === TutorStatus.PENDING) {
      const tutorStatusHistory = await this.prisma.tutorStatusHistory.create({
        data: {
          comment: createTutorStatusHistoryDto.comment,
          previousStatus: currentTutor.status,
          decision: TutorStatusDecision.NEEDS_CHANGES,
          tutorId: currentTutor.id,
        },
      });

      const tutorUpdated = await this.prisma.tutor.update({
        where: { id: currentTutor.id, userId: user.id },
        data: { status: createTutorStatusHistoryDto.status },
      });

      await this.updatedTutorStatus.send(
        user,
        tutorStatusHistory.comment,
        tutorUpdated.status,
      );

      return { message: 'Tutor actualizado.' };
    } else if (createTutorStatusHistoryDto.status === TutorStatus.APPROVED) {
      const tutorStatusHistory = await this.prisma.tutorStatusHistory.create({
        data: {
          comment: createTutorStatusHistoryDto.comment,
          previousStatus: currentTutor.status,
          decision: TutorStatusDecision.APPROVED,
          resubmittedAt: new Date(),
          tutorId: currentTutor.id,
        },
      });

      const tutorUpdated = await this.prisma.tutor.update({
        where: { id: currentTutor.id, userId: user.id },
        data: {
          status: createTutorStatusHistoryDto.status,
          approvedAt: new Date(),
        },
      });

      await this.updatedTutorStatus.send(
        user,
        tutorStatusHistory.comment,
        tutorUpdated.status,
      );

      return { message: 'Tutor actualizado.' };
    }
  }
}
