import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { SubscriptionOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateSubscriptionOrderDto } from '../dto/create-subscription-order.dto';

@Injectable()
export class SubscriptionOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tutorId: string) {
    await this.prisma.findTutorOrThrow(tutorId);

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
    await this.prisma.findSubscriptionOrderOrThrow(id);
    await this.prisma.findTutorOrThrow(tutorId);

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
    await this.prisma.findTutorOrThrow(tutorId);

    try {
      if (status === SubscriptionOrderStatus.UNVERIFIED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status, tutorId },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.NEEDS_REVISION) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status, tutorId },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.RESUBMITTED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status, tutorId },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.APPROVED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status, tutorId },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.CANCELED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status, tutorId },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      }
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
    await this.prisma.findTutorOrThrow(tutorId);
    await this.prisma.findPlanOrThrow(planId);

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
