import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateMobilePaymentDto } from '../dto/create-mobile-payment.dto';

@Injectable()
export class MobilePaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findTutorOrThrow(id: string) {
    const tutor = await this.prisma.tutor.findUnique({
      where: { id },
    });
    if (!tutor) throw new NotFoundException('Tutor no encontrado');
    return tutor;
  }

  async create(
    tutorId: string,
    createMobilePaymentDto: CreateMobilePaymentDto,
  ) {
    await this.findTutorOrThrow(tutorId);

    try {
      await this.prisma.mobilePayment.create({
        data: {
          phoneCode: createMobilePaymentDto.phoneCode,
          phoneNumber: createMobilePaymentDto.phoneNumber,
          documentType: createMobilePaymentDto.documentType,
          documentNumber: createMobilePaymentDto.documentNumber,
          bankId: createMobilePaymentDto.bankId,
          tutor: {
            connect: { id: tutorId },
          },
        },
      });

      return { message: 'Pago Móvil agregado exitosamente!' };
    } catch (error) {
      console.error('Error al crear la lección:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
