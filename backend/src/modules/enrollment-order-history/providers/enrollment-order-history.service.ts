import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { EnrollmentOrderStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { UpdateEnrollmentOrderDto } from 'src/modules/enrollment-orders/dto/update-enrollment-order.dto';

@Injectable()
export class EnrollmentOrderHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async resubmittedAt(
    id: string,
    enrollmentOrderId: string,
    studentId: string,
    updateEnrollmentOrderDto: UpdateEnrollmentOrderDto,
  ) {
    await this.InfrastructureService.findEnrollmentOrderHistoryOrThrow(id);
    await this.InfrastructureService.findEnrollmentOrderOrThrow(
      enrollmentOrderId,
    );
    await this.InfrastructureService.findStudentOrThrow(studentId);

    try {
      await this.prisma.enrollmentOrderHistory.update({
        where: { id },
        data: { resubmittedAt: new Date() },
      });

      await this.prisma.enrollmentOrder.update({
        where: { id: enrollmentOrderId, studentId },
        data: {
          status: EnrollmentOrderStatus.RESUBMITTED,
          paymentReference: updateEnrollmentOrderDto.paymentReference,
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
