import { Injectable } from '@nestjs/common';

import {
  startOfMonth,
  subMonths,
  startOfYear,
  endOfYear,
  subYears,
  getMonth,
  getYear,
  format,
} from 'date-fns';
import { es } from 'date-fns/locale';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async infoCards() {
    const now = new Date();

    // Obtener el primer día del mes actual
    const startOfCurrentMonth = startOfMonth(now);

    // Obtener el primer día del mes anterior
    const startOfPreviousMonth = startOfMonth(subMonths(now, 1));

    // Configurar fechas para el año actual
    const startOfCurrentYear = startOfYear(now);
    const endOfCurrentYear = endOfYear(now);

    // Configurar fechas para el año anterior
    const startOfLastYear = startOfYear(subYears(now, 1));
    const endOfLastYear = endOfYear(subYears(now, 1));

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
    const currentYear = getYear(new Date());

    const usersByMonth = await this.getUsersByMonth(currentYear);

    // Datos para el gráfico
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = usersByMonth.find((m) => m.month === i + 1);
      return {
        month: format(new Date(currentYear, i), 'MMM', { locale: es }),
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
          month: getMonth(item.createdAt) + 1, // getMonth devuelve 0-11, sumamos 1
          count: item._count,
        })),
      );
  }
}
