import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        student: true,
        tutor: true,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        student: true,
        tutor: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
        tutor: true,
      },
    });
  }
}
