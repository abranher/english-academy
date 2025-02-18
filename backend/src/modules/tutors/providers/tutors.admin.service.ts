import { Injectable } from '@nestjs/common';
import { Roles } from '@prisma/client';

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

  async findOne(userId: string) {
    const tutorUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tutor: true,
      },
    });

    return tutorUser;
  }
}
