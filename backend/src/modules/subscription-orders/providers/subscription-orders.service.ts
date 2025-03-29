import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { SubscriptionOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { CreateSubscriptionOrderDto } from '../dto/create-subscription-order.dto';

@Injectable()
export class SubscriptionOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async findAll(tutorId: string) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    try {
      return await this.prisma.subscriptionOrder.findMany({
        where: { tutorId },
        include: { tutor: { include: { user: true } }, plan: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findOne(id: string, tutorId: string) {
    await this.InfrastructureService.findSubscriptionOrderOrThrow(id);
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    try {
      return this.prisma.subscriptionOrder.findUnique({
        where: { id, tutorId },
        include: {
          tutor: { include: { user: true } },
          plan: true,
          subscriptionOrderHistory: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findByStatus(status: SubscriptionOrderStatus, tutorId: string) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    try {
      return await this.prisma.subscriptionOrder.findMany({
        where: { status, tutorId },
        include: { tutor: { include: { user: true } }, plan: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async create(
    tutorId: string,
    planId: string,
    createSubscriptionOrderDto: CreateSubscriptionOrderDto,
  ) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);
    await this.InfrastructureService.findPlanOrThrow(planId);

    try {
      await this.prisma.subscription.create({
        data: {
          planId,
          tutor: { connect: { id: tutorId } },
          subscriptionOrder: {
            create: {
              subscriptionPrice: createSubscriptionOrderDto.subscriptionPrice,
              paymentReference: createSubscriptionOrderDto.paymentReference,
              tutorId,
              planId,
            },
          },
        },
      });

      return { message: 'Orden de suscripción creada exitosamente!' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
