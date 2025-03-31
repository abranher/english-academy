import { Injectable } from '@nestjs/common';

import {
  SubscriptionOrderStatus,
  SubscriptionOrderStatusDecision,
  SubscriptionStatus,
  BillingCycle,
} from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { CreateSubscriptionOrderHistoryDto } from '../dto/create-subscription-order-history.dto';

@Injectable()
export class OrderHistoryAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async create(
    subscriptionOrderId: string,
    createSubscriptionOrderHistoryDto: CreateSubscriptionOrderHistoryDto,
  ) {
    const subscriptionOrder =
      await this.infrastructureService.findSubscriptionOrderOrThrow(
        subscriptionOrderId,
      );

    if (
      createSubscriptionOrderHistoryDto.status ===
      SubscriptionOrderStatus.NEEDS_REVISION
    ) {
      await this.prisma.subscriptionOrderHistory.create({
        data: {
          comment: createSubscriptionOrderHistoryDto.comment,
          previousStatus: subscriptionOrder.status,
          decision: SubscriptionOrderStatusDecision.NEEDS_CHANGES,
          subscriptionOrderId,
        },
      });

      await this.prisma.subscriptionOrder.update({
        where: { id: subscriptionOrderId },
        data: { status: createSubscriptionOrderHistoryDto.status },
      });

      return { message: 'Órden actualizada.' };
    } else if (
      createSubscriptionOrderHistoryDto.status ===
      SubscriptionOrderStatus.APPROVED
    ) {
      const plan = await this.infrastructureService.findPlanOrThrow(
        subscriptionOrder.planId,
      );

      const now = new Date();
      const endDate = new Date();

      // Calcular endDate según el billingCycle
      if (plan.billingCycle === BillingCycle.MONTHLY) {
        endDate.setMonth(now.getMonth() + 1);
      } else if (plan.billingCycle === BillingCycle.ANNUAL) {
        endDate.setFullYear(now.getFullYear() + 1);
      }

      await this.prisma.subscriptionOrderHistory.create({
        data: {
          comment: createSubscriptionOrderHistoryDto.comment,
          previousStatus: subscriptionOrder.status,
          decision: SubscriptionOrderStatusDecision.APPROVED,
          subscriptionOrderId,
        },
      });

      await this.prisma.subscriptionOrder.update({
        where: { id: subscriptionOrderId },
        data: {
          status: createSubscriptionOrderHistoryDto.status,
          approvedAt: now,
          subscription: {
            update: {
              status: SubscriptionStatus.ACTIVE,
              startDate: now,
              endDate: endDate,
            },
          },
        },
      });

      return {
        message: 'Órden aprobada y fechas de suscripción establecidas.',
      };
    }
  }
}
