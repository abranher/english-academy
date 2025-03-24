import { Injectable } from '@nestjs/common';

import {
  SubscriptionOrderStatus,
  SubscriptionOrderStatusDecision,
} from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateSubscriptionOrderHistoryDto } from '../dto/create-subscription-order-history.dto';

@Injectable()
export class OrderHistoryAdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    subscriptionOrderId: string,
    createSubscriptionOrderHistoryDto: CreateSubscriptionOrderHistoryDto,
  ) {
    const subscriptionOrder =
      await this.prisma.findSubscriptionOrderOrThrow(subscriptionOrderId);

    if (
      createSubscriptionOrderHistoryDto.status ===
      SubscriptionOrderStatus.NEEDS_REVISION
    ) {
      const StatusHistory = await this.prisma.subscriptionOrderHistory.create({
        data: {
          comment: createSubscriptionOrderHistoryDto.comment,
          previousStatus: subscriptionOrder.status,
          decision: SubscriptionOrderStatusDecision.NEEDS_CHANGES,
          subscriptionOrderId: subscriptionOrder.id,
        },
      });

      const subscriptionOrderUpdated =
        await this.prisma.subscriptionOrder.update({
          where: { id: subscriptionOrderId },
          data: { status: createSubscriptionOrderHistoryDto.status },
        });

      // await this.updatedTutorStatus.send(
      //   user,
      //   tutorStatusHistory.comment,
      //   tutorUpdated.status,
      // );

      return { message: 'Órden actualizada.' };
    } else if (
      createSubscriptionOrderHistoryDto.status ===
      SubscriptionOrderStatus.APPROVED
    ) {
      const StatusHistory = await this.prisma.subscriptionOrderHistory.create({
        data: {
          comment: createSubscriptionOrderHistoryDto.comment,
          previousStatus: subscriptionOrder.status,
          decision: SubscriptionOrderStatusDecision.APPROVED,
          subscriptionOrderId: subscriptionOrder.id,
        },
      });

      const subscriptionOrderUpdated =
        await this.prisma.subscriptionOrder.update({
          where: { id: subscriptionOrderId },
          data: {
            status: createSubscriptionOrderHistoryDto.status,
            approvedAt: new Date(),
          },
        });

      // await this.updatedTutorStatus.send(
      //   user,
      //   tutorStatusHistory.comment,
      //   tutorUpdated.status,
      // );

      return { message: 'Órden actualizada.' };
    }
  }
}
