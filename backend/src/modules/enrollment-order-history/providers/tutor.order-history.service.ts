import { Injectable } from '@nestjs/common';

import {
  EnrollmentOrderStatus,
  EnrollmentOrderStatusDecision,
} from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { CreateEnrollmentOrderHistoryDto } from '../dto/create-enrollment-order-history.dto';

@Injectable()
export class TutorOrderHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async create(
    tutorId: string,
    enrollmentOrderId: string,
    createEnrollmentOrderHistoryDto: CreateEnrollmentOrderHistoryDto,
  ) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);
    const enrollmentOrder =
      await this.InfrastructureService.findEnrollmentOrderOrThrow(
        enrollmentOrderId,
      );

    if (
      createEnrollmentOrderHistoryDto.status ===
      EnrollmentOrderStatus.NEEDS_REVISION
    ) {
      const StatusHistory = await this.prisma.enrollmentOrderHistory.create({
        data: {
          comment: createEnrollmentOrderHistoryDto.comment,
          previousStatus: enrollmentOrder.status,
          decision: EnrollmentOrderStatusDecision.NEEDS_CHANGES,
          enrollmentOrderId,
        },
      });

      const enrollmentOrderUpdated = await this.prisma.enrollmentOrder.update({
        where: { id: enrollmentOrderId },
        data: { status: createEnrollmentOrderHistoryDto.status },
      });

      // await this.updatedTutorStatus.send(
      //   user,
      //   tutorStatusHistory.comment,
      //   tutorUpdated.status,
      // );

      return { message: 'Órden actualizada.' };
    } else if (
      createEnrollmentOrderHistoryDto.status === EnrollmentOrderStatus.APPROVED
    ) {
      const StatusHistory = await this.prisma.enrollmentOrderHistory.create({
        data: {
          comment: createEnrollmentOrderHistoryDto.comment,
          previousStatus: enrollmentOrder.status,
          decision: EnrollmentOrderStatusDecision.APPROVED,
          enrollmentOrderId,
        },
      });

      const enrollmentOrderUpdated = await this.prisma.enrollmentOrder.update({
        where: { id: enrollmentOrderId },
        data: {
          status: createEnrollmentOrderHistoryDto.status,
          approvedAt: new Date(),
          enrollment: { update: { data: { isActive: true } } },
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
