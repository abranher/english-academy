import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async insightsCards() {
    const totalUsers = await this.prisma.user.count();

    return {
      totalUsers,
    };
  }
}
