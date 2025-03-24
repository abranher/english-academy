import { Injectable } from '@nestjs/common';

import { SubscriptionOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { UpdateSubscriptionOrderDto } from 'src/modules/subscription-orders/dto/update-subscription-order.dto';

@Injectable()
export class SubscriptionOrderHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async resubmittedAt(
    id: string,
    subscriptionOrderId: string,
    tutorId: string,
    updateSubscriptionOrderDto: UpdateSubscriptionOrderDto,
  ) {
    await this.InfrastructureService.findSubscriptionOrderHistoryOrThrow(id);
    await this.InfrastructureService.findSubscriptionOrderOrThrow(
      subscriptionOrderId,
    );
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    await this.prisma.subscriptionOrderHistory.update({
      where: { id },
      data: { resubmittedAt: new Date() },
    });

    await this.prisma.subscriptionOrder.update({
      where: { id: subscriptionOrderId, tutorId },
      data: {
        status: SubscriptionOrderStatus.RESUBMITTED,
        paymentReference: updateSubscriptionOrderDto.paymentReference,
      },
    });

    /*
        try {
          await this.notifications.statusUpdateTutor(
            user,
            tutorStatusHistory.comment,
            tutorUpdated.status,
          );
        } catch (error) {
          console.error('Error enviando notificación:', error);
        }
        */

    return { message: 'Reenviado exitosamente.' };
  }
}
