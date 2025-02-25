import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async infoCards() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Obtener el primer día del mes actual
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Obtener el primer día del mes anterior
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

    // Configurar fechas para el año actual
    const startOfCurrentYear = new Date(currentYear, 0, 1);
    const endOfCurrentYear = new Date(currentYear + 1, 0, 1);

    // Configurar fechas para el año anterior
    const startOfLastYear = new Date(currentYear - 1, 0, 1);
    const endOfLastYear = new Date(currentYear, 0, 1);

    const [totalUsers, currentYearUsers, lastYearUsers, previousMonthUsers] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.user.count({
          where: {
            createdAt: { gte: startOfCurrentYear, lt: endOfCurrentYear },
          },
        }),
        this.prisma.user.count({
          where: { createdAt: { gte: startOfLastYear, lt: endOfLastYear } },
        }),
        this.prisma.user.count({
          where: {
            createdAt: { lt: startOfCurrentMonth, gte: startOfPreviousMonth },
          },
        }),
      ]);

    return {
      totalUsers,
      previousMonthUsers,
      currentYearUsers,
      lastYearUsers,
    };
  }

  async getMonthlyRegistrations() {
    const currentYear = new Date().getFullYear();

    const usersByMonth = await this.getUsersByMonth(currentYear);

    // Datos para el gráfico
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = usersByMonth.find((m) => m.month === i + 1);
      return {
        month: new Date(currentYear, i).toLocaleString('default', {
          month: 'short',
        }),
        users: monthData ? monthData.count : 0,
      };
    });

    return {
      chartData,
    };
  }

  private async getUsersByMonth(year: number) {
    return this.prisma.user
      .groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: new Date(year, 0, 1),
            lt: new Date(year + 1, 0, 1),
          },
        },
        _count: true,
      })
      .then((res) =>
        res.map((item) => ({
          month: item.createdAt.getMonth() + 1,
          count: item._count,
        })),
      );
  }
}
