import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/providers/prisma.service';

@Injectable()
export class InfrastructureService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserOrThrow(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findTutorOrThrow(id: string) {
    const tutor = await this.prisma.tutor.findUnique({ where: { id } });
    if (!tutor) throw new NotFoundException('Tutor no encontrado');
    return tutor;
  }

  async findStudentOrThrow(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Estudiante no encontrado');
    return student;
  }

  async findCourseOrThrow(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso no encontrado');
    return course;
  }

  async findClassOrThrow(id: string) {
    const lesson = await this.prisma.class.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Clase no encontrada');
    return lesson;
  }

  async findQuizOrThrow(id: string) {
    const lesson = await this.prisma.quiz.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Quiz no encontrado');
    return lesson;
  }

  async findPlanOrThrow(id: string) {
    const plan = await this.prisma.plan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('Plan no encontrado');
    return plan;
  }

  async findSubscriptionOrderOrThrow(id: string) {
    const order = await this.prisma.subscriptionOrder.findUnique({
      where: { id },
    });
    if (!order)
      throw new NotFoundException('Órden de suscripción no encontrada');
    return order;
  }

  async findSubscriptionOrderHistoryOrThrow(id: string) {
    const history = await this.prisma.subscriptionOrderHistory.findUnique({
      where: { id },
    });
    if (!history)
      throw new NotFoundException(
        'Historial de Órden de suscripción no encontrado',
      );
    return history;
  }

  async findEnrollmentOrderOrThrow(id: string) {
    const order = await this.prisma.enrollmentOrder.findUnique({
      where: { id },
    });
    if (!order)
      throw new NotFoundException('Órden de inscripción no encontrada');
    return order;
  }

  async findEnrollmentOrderHistoryOrThrow(id: string) {
    const history = await this.prisma.enrollmentOrderHistory.findUnique({
      where: { id },
    });
    if (!history)
      throw new NotFoundException(
        'Historial de Órden de inscripción no encontrado',
      );
    return history;
  }
}
