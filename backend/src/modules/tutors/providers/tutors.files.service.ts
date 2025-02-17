import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UsersService } from 'src/modules/users/providers/users.service';

@Injectable()
export class TutorsFilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly config: ConfigService,
  ) {}

  private async findUserOrThrow(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async uploadCv(userId: string, cvName: string) {
    const user = await this.findUserOrThrow(userId);

    try {
      await this.prisma.tutor.update({
        where: { userId: user.id },
        data: { cvUrl: cvName },
      });
    } catch (error) {
      console.error('Error updating cv of tutor:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Uno más.' };
  }
}
