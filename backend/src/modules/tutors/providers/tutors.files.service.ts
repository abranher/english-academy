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

  // delete files
  private async deleteFile(filename: string) {
    const fs = await import('fs/promises');
    const path = await import('path');

    try {
      await fs.unlink(path.join(process.cwd(), 'storage/images', filename));
    } catch (err) {
      console.error(`Error eliminando archivo ${filename}:`, err);
    }
  }

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

  async uploadAvatar(userId: string, avatarUrl: string) {
    const user = await this.findUserOrThrow(userId);

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { avatarUrl },
      });
    } catch (error) {
      console.error('Error updating avatar of tutor:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Falta poco.' };
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    const user = await this.findUserOrThrow(userId);

    if (user.avatarUrl) {
      await this.deleteFile(user.avatarUrl);
    }

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { avatarUrl },
      });
    } catch (error) {
      console.error('Error updating avatar of tutor:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Imagen de perfil actualizada exitosamente.' };
  }
}
