import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class ClassAttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findClassOrThrow(id: string) {
    const lessonClass = await this.prisma.class.findUnique({ where: { id } });
    if (!lessonClass) throw new NotFoundException('Clase no encontrada.');
    return lessonClass;
  }

  async findAttachmentOrThrow(id: string) {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id },
    });
    if (!attachment) throw new NotFoundException('Recurso no encontrado.');
    return attachment;
  }

  async remove(id: string, classId: string, attachmentId: string) {
    await this.findClassOrThrow(classId);
    await this.findAttachmentOrThrow(attachmentId);

    try {
      await this.prisma.classAttachment.delete({
        where: { id, classId, attachmentId },
      });

      return { message: 'Recurso adjuntado eliminado exitosamente!' };
    } catch (error) {
      console.error('Error al eliminar el recurso:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
