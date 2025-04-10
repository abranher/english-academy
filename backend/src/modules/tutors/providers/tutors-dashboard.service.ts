import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { es } from 'date-fns/locale';
import { endOfYear, format, getMonth, getYear, startOfYear } from 'date-fns';
import { CoursePlatformStatus, EnrollmentOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

@Injectable()
export class TutorsDashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async getTutorEarningsAnalytics(tutorId: string) {
    await this.infrastructureService.findTutorOrThrow(tutorId);

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

  async getActiveStudentsAnalytics(tutorId: string) {
    await this.infrastructureService.findTutorOrThrow(tutorId);

    try {
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      const [totalActive, currentMonthActive, lastMonthActive] =
        await Promise.all([
          // Total de estudiantes activos
          this.prisma.enrollment.count({
            where: { course: { tutorId }, isActive: true },
          }),

          // Estudiantes activos este mes
          this.prisma.enrollment.count({
            where: {
              course: { tutorId },
              isActive: true,
              enrolledAt: { gte: currentMonthStart },
            },
          }),

          // Estudiantes activos mes anterior
          this.prisma.enrollment.count({
            where: {
              course: { tutorId },
              isActive: true,
              enrolledAt: { gte: lastMonthStart, lte: lastMonthEnd },
            },
          }),
        ]);

      const percentageChange =
        lastMonthActive > 0
          ? ((currentMonthActive - lastMonthActive) / lastMonthActive) * 100
          : 100;

      return {
        totalActive,
        monthlyComparison: {
          current: currentMonthActive,
          percentageChange,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al calcular las métricas de estudiantes activos',
        error,
      );
    }
  }

  async getCoursesStats(tutorId: string) {
    try {
      const result = await this.prisma.course.groupBy({
        by: ['platformStatus'],
        where: { tutorId },
        _count: { _all: true },
      });

      const published =
        result.find((r) => r.platformStatus === CoursePlatformStatus.PUBLISHED)
          ?._count._all || 0;
      const draft =
        result.find((r) => r.platformStatus === CoursePlatformStatus.DRAFT)
          ?._count._all || 0;
      const archived =
        result.find((r) => r.platformStatus === CoursePlatformStatus.ARCHIVED)
          ?._count._all || 0;
      const total = result.reduce((sum, item) => sum + item._count._all, 0);

      const publishedPercentage = total > 0 ? (published / total) * 100 : 0;
      const draftPercentage = total > 0 ? (draft / total) * 100 : 0;
      const archivedPercentage = total > 0 ? (archived / total) * 100 : 0;

      return {
        counts: {
          published,
          draft,
          archived,
          total,
        },
        percentages: {
          published: parseFloat(publishedPercentage.toFixed(1)),
          draft: parseFloat(draftPercentage.toFixed(1)),
          archived: parseFloat(archivedPercentage.toFixed(1)),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener estadísticas de cursos',
        error,
      );
    }
  }

  /*
   * For chart
   */
  async getTutorMonthlyRevenue(tutorId: string) {
    await this.infrastructureService.findTutorOrThrow(tutorId);

    try {
      const currentYear = getYear(new Date());

      const enrollments = await this.prisma.enrollment.findMany({
        where: {
          course: { tutorId },
          enrolledAt: {
            gte: startOfYear(new Date(currentYear, 0, 1)),
            lt: endOfYear(new Date(currentYear, 0, 1)),
          },
          isActive: true,
        },
        select: { enrolledAt: true, purchasedPrice: true },
      });

      const monthlyRevenue = enrollments.reduce((acc, enrollment) => {
        const month = getMonth(enrollment.enrolledAt);
        acc[month] = (acc[month] || 0) + enrollment.purchasedPrice;
        return acc;
      }, {});

      const chartData = Array.from({ length: 12 }, (_, i) => ({
        month: format(new Date(currentYear, i), 'MMM', { locale: es }),
        revenue: monthlyRevenue[i] || 0,
      }));

      const totalRevenue = Object.values(monthlyRevenue).reduce(
        (sum: number, revenue: number) => sum + revenue,
        0,
      );

      return { chartData, totalRevenue };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al calcular las métricas de ingresos',
        error,
      );
    }
  }

  async getTutorCoursesStudents(tutorId: string) {
    await this.infrastructureService.findTutorOrThrow(tutorId);

    try {
      const courses = await this.prisma.course.findMany({
        where: { tutorId, platformStatus: CoursePlatformStatus.PUBLISHED },
        select: {
          id: true,
          title: true,
          enrollments: { where: { isActive: true }, select: { id: true } },
        },
      });

      const chartData = courses
        .map((course) => ({
          course: course.title,
          students: course.enrollments.length,
        }))
        .sort((a, b) => b.students - a.students);

      const totalStudents = chartData.reduce(
        (sum, item) => sum + item.students,
        0,
      );

      return { chartData, totalStudents };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al calcular las métricas de ingresos',
        error,
      );
    }
  }
}
