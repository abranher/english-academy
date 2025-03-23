import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  private async findPlanOrThrow(id: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id, isActive: true },
    });
    if (!plan) throw new NotFoundException('Plan no encontrado.');
    return plan;
  }

  /*
   * Get Plans
   */
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

  /*
   * Get Plan one
   */
  async findOne(id: string) {
    const plan = this.findPlanOrThrow(id);

    try {
      return plan;
    } catch (error) {
      throw new InternalServerErrorException('Error obteniendo el plan', error);
    }
  }
}
