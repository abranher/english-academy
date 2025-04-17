import { Injectable } from '@nestjs/common';
import { Roles } from '@prisma/client';

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

    const [students, tutors] = await Promise.all([
      this.prisma.user.count({ where: { role: Roles.STUDENT } }),
      this.prisma.user.count({ where: { role: Roles.TUTOR } }),
    ]);

    return {
      totalUsers,
      previousMonthUsers,
      currentYearUsers,
      lastYearUsers,
      students,
      tutors,
    };
  }

  async getMonthlyRegistrations() {
    const currentYear = getYear(new Date());

    const usersByMonth = await this.getUsersByMonth(currentYear);

    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = usersByMonth.find((m) => m.month === i + 1);
      return {
        month: format(new Date(currentYear, i), 'MMM', { locale: es }),
        users: monthData ? monthData.count : 0,
      };
    });

    return { chartData };
  }

  private async getUsersByMonth(year: number) {
    const users = await this.prisma.user.findMany({
      where: {
        createdAt: { gte: new Date(year, 0, 1), lt: new Date(year + 1, 0, 1) },
      },
      select: { createdAt: true },
    });

    const grouped = users.reduce((acc, user) => {
      const month = getMonth(user.createdAt) + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // esto devuelve algo asi: [ { month: 2, count: 6n } ]
    /*console.log(
      await this.prisma.$queryRaw`
    SELECT 
      EXTRACT(MONTH FROM "createdAt") as month,
      COUNT(*) as count
    FROM "User"
    WHERE "createdAt" >= ${new Date(year, 0, 1)}
      AND "createdAt" < ${new Date(year + 1, 0, 1)}
    GROUP BY EXTRACT(MONTH FROM "createdAt")
  `,
    );*/

    return Object.entries(grouped).map(([month, count]) => ({
      month: Number(month),
      count: count as number,
    }));
  }
}
