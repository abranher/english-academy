import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { SubscriptionOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

@Injectable()
export class OrdersAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async findAll() {
    try {
      return await this.prisma.subscriptionOrder.findMany({
        include: { tutor: { include: { user: true } }, plan: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async findOne(id: string) {
    await this.InfrastructureService.findSubscriptionOrderOrThrow(id);

    try {
      return this.prisma.subscriptionOrder.findUnique({
        where: { id },
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

  async findByStatus(status: SubscriptionOrderStatus) {
    try {
      if (status === SubscriptionOrderStatus.UNVERIFIED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.NEEDS_REVISION) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.RESUBMITTED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.APPROVED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status },
          include: { tutor: { include: { user: true } }, plan: true },
        });
      } else if (status === SubscriptionOrderStatus.CANCELED) {
        return await this.prisma.subscriptionOrder.findMany({
          where: { status },
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
}
