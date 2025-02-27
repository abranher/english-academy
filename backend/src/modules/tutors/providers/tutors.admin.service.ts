import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Roles, TutorStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { UpdateTutorStatusDto } from '../dto/update-tutor-status.dto';

@Injectable()
export class TutorsAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  private async findUserOrThrow(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: Roles.TUTOR, tutor: { isNot: null } },
      include: { tutor: true },
    });
  }

  async findByStatus(status: TutorStatus) {
    if (status === TutorStatus.NEW)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.NEW } },
        include: { tutor: true },
      });
    else if (status === TutorStatus.PENDING)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.PENDING } },
        include: { tutor: true },
      });
    else if (status === TutorStatus.APPROVED)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.APPROVED } },
        include: { tutor: true },
      });
    else if (status === TutorStatus.REJECTED)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.REJECTED } },
        include: { tutor: true },
      });
  }

  async findUserTutor(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: { tutor: { include: { certifications: true } } },
    });
  }

  async manageTutorStatus(
    userId: string,
    updateTutorStatusDto: UpdateTutorStatusDto,
  ) {
    const user = await this.findUserOrThrow(userId);

    const currentTutor = await this.prisma.tutor.findUniqueOrThrow({
      where: { userId: user.id },
      select: { statusHistory: true, status: true },
    });

    const newEntry = {
      id: crypto.randomUUID(),
      comment: updateTutorStatusDto.comment,
      previousStatus: currentTutor.status,
      createdAt: new Date(),
    };

    const existingStatusHistory = Array.isArray(currentTutor.statusHistory)
      ? currentTutor.statusHistory
      : [];

    const updatedStatusHistory = [
      ...existingStatusHistory,
      newEntry,
    ] as Prisma.JsonArray;

    await this.prisma.tutor.update({
      where: { userId: user.id },
      data: {
        status: updateTutorStatusDto.status,
        statusHistory: updatedStatusHistory,
      },
    });

    return { message: 'Tutor actualizado.' };
  }
}
