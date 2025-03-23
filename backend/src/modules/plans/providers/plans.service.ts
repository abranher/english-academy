import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.plan.findMany({
        where: { isActive: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error obteniendo los planes',
        error,
      );
    }
  }
}
