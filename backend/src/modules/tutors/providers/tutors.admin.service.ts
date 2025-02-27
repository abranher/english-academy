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
      where: {
        role: Roles.TUTOR,
        tutor: { isNot: null },
      },
      include: {
        tutor: true,
      },
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
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.PENDING } },
        include: { tutor: true },
      });
    else if (status === TutorStatus.REJECTED)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.PENDING } },
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

    console.log(user.tutor.rejectionHistory);

    const json = [
      {
        id: crypto.randomUUID(),
        comment: updateTutorStatusDto.comment,
        previousStatus: user.tutor.status,
        createdAt: Date(),
      },
    ] as Prisma.JsonArray;

    if (updateTutorStatusDto.status === TutorStatus.PENDING)
      await this.prisma.tutor.update({
        where: { userId: user.id },
        data: { status: TutorStatus.PENDING, rejectionHistory: json },
      });
    else if (updateTutorStatusDto.status === TutorStatus.APPROVED)
      await this.prisma.tutor.update({
        where: { userId: user.id },
        data: { status: TutorStatus.APPROVED, rejectionHistory: json },
      });
    else if (updateTutorStatusDto.status === TutorStatus.REJECTED)
      await this.prisma.tutor.update({
        where: { userId: user.id },
        data: { status: TutorStatus.REJECTED, rejectionHistory: json },
      });

    return {
      message: 'Tutor actualizado.',
    };
  }
}
