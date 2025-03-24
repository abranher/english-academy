import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async findTutorOrThrow(id: string) {
    const tutor = await this.tutor.findUnique({ where: { id } });
    if (!tutor) throw new NotFoundException('Tutor no encontrado');
    return tutor;
  }

  async findPlanOrThrow(id: string) {
    const plan = await this.plan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('Plan no encontrado');
    return plan;
  }
}
