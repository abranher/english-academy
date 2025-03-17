import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { deleteFile } from 'src/libs/storage';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserOrThrow(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    return user;
  }

  async findAttachmentOrThrow(id: string) {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id },
    });
    if (!attachment) throw new NotFoundException('Recurso no encontrado.');
    return attachment;
  }

  async findAll(userId: string) {
    try {
      const user = await this.findUserOrThrow(userId);

      const tutor = await this.prisma.tutor.findUnique({
        where: { userId: user.id },
      });

      return await this.prisma.attachment.findMany({
        where: { tutorId: tutor.id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los recursos:',
        error,
      );
    }
  }

  async deleteAttachment(id: string, userId: string) {
    await this.findUserOrThrow(userId);
    const attachment = await this.findAttachmentOrThrow(id);

    try {
      await deleteFile(attachment.url, 'attachments');

      await this.prisma.attachment.delete({
        where: { id },
      });

      return { message: 'Recurso eliminado exitosamente!' };
    } catch (error) {
      console.error('Error al eliminar el recurso:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
