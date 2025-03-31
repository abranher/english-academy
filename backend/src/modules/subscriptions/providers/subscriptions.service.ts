import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async findOne(tutorId: string) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    try {
      const { activeSubscription } = await this.prisma.tutor.findUnique({
        where: { id: tutorId },
        include: { activeSubscription: { include: { plan: true } } },
      });

      return activeSubscription;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
