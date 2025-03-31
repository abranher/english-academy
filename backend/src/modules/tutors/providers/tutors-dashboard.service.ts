import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { EnrollmentOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

@Injectable()
export class TutorsDashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async getTutorEarningsAnalytics(tutorId: string) {
    try {
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      const [totalEarnings, currentMonthEarnings, lastMonthEarnings] =
        await Promise.all([
          // Total de ingresos
          this.prisma.enrollmentOrder.aggregate({
            where: {
              course: { tutorId },
              status: EnrollmentOrderStatus.APPROVED,
            },
            _sum: { enrollmentPrice: true },
          }),

          // Ingresos del mes actual
          this.prisma.enrollmentOrder.aggregate({
            where: {
              course: { tutorId },
              status: EnrollmentOrderStatus.APPROVED,
              createdAt: { gte: currentMonthStart },
            },
            _sum: { enrollmentPrice: true },
          }),

          // Ingresos del mes anterior
          this.prisma.enrollmentOrder.aggregate({
            where: {
              course: { tutorId },
              status: EnrollmentOrderStatus.APPROVED,
              createdAt: { gte: lastMonthStart, lte: lastMonthEnd },
            },
            _sum: { enrollmentPrice: true },
          }),
        ]);

      // Calcular métricas
      const total = totalEarnings._sum.enrollmentPrice || 0;
      const current = currentMonthEarnings._sum.enrollmentPrice || 0;
      const last = lastMonthEarnings._sum.enrollmentPrice || 0;
      const percentageChange = last > 0 ? ((current - last) / last) * 100 : 100;

      return {
        totalEarnings: total,
        monthlyComparison: {
          current,
          percentageChange,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al calcular las métricas de ingresos',
        error,
      );
    }
  }
}
