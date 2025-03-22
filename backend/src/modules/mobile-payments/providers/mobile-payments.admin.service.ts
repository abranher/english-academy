import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { UpdateMobilePaymentDto } from '../dto/update-mobile-payment.dto';

@Injectable()
export class MobilePaymentsAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  private async findUserOrThrow(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  private async findPlatformOrThrow() {
    const platform = await this.prisma.platform.findFirst();
    if (!platform) throw new NotFoundException('Plataforma no encontrada');
    return platform;
  }

  async update(userId: string, updateMobilePaymentDto: UpdateMobilePaymentDto) {
    await this.findUserOrThrow(userId);
    const platform = await this.findPlatformOrThrow();

    try {
      await this.prisma.platform.update({
        where: { id: platform.id },
        data: {
          mobilePayment: {
            update: {
              phoneCode: updateMobilePaymentDto.phoneCode,
              phoneNumber: updateMobilePaymentDto.phoneNumber,
              documentType: updateMobilePaymentDto.documentType,
              documentNumber: updateMobilePaymentDto.documentNumber,
              bankId: updateMobilePaymentDto.bankId,
            },
          },
        },
      });

      return { message: 'Pago Móvil actualizado exitosamente!' };
    } catch (error) {
      console.error('Error al actualizar el pago movil:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
