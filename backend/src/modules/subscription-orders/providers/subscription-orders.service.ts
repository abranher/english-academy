import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateSubscriptionOrderDto } from '../dto/create-subscription-order.dto';

@Injectable()
export class SubscriptionOrdersService {
  constructor(private readonly prisma: PrismaService) {}

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
