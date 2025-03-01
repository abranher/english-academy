import { Injectable, NotFoundException } from '@nestjs/common';
import { Roles, TutorStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class TutorsAdminService {
  constructor(private readonly prisma: PrismaService) {}

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
    const tutorUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tutor: { include: { certifications: true, tutorStatusHistory: true } },
      },
    });

    if (!tutorUser) throw new NotFoundException('Usuario no encontrado.');

    return tutorUser;
  }
}
