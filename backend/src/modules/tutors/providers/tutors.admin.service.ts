import { Injectable } from '@nestjs/common';
import { Roles, TutorStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class TutorsAdminService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findPending() {
    return this.prisma.user.findMany({
      where: {
        role: Roles.TUTOR,
        tutor: {
          status: TutorStatus.PENDING,
        },
      },
      include: {
        tutor: true,
      },
    });
  }

  async findApproved() {
    return this.prisma.user.findMany({
      where: {
        role: Roles.TUTOR,
        tutor: {
          status: TutorStatus.APPROVED,
        },
      },
      include: {
        tutor: true,
      },
    });
  }
}
