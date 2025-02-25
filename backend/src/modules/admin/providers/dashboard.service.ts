import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async infoCards() {
    const now = new Date();

    // Obtener el primer día del mes actual
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Obtener el primer día del mes anterior
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

    const totalUsers = await this.prisma.user.count();

    // Contar los usuarios registrados antes del inicio del mes actual (mes anterior)
    const previousMonthUsers = await this.prisma.user.count({
      where: {
        createdAt: {
          lt: startOfCurrentMonth, // Usuarios registrados antes del inicio del mes actual
          gte: startOfPreviousMonth, // Usuarios registrados desde el inicio del mes anterior
        },
      },
    });

    return {
      totalUsers,
      previousMonthUsers,
    };
  }
}
