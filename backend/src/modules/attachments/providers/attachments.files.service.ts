import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

@Injectable()
export class AttachmentsFilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserOrThrow(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    return user;
  }

  async uploadAttachment(
    userId: string,
    attachment: string,
    createAttachmentDto: CreateAttachmentDto,
  ) {
    try {
      const user = await this.findUserOrThrow(userId);

      const tutor = await this.prisma.tutor.findUnique({
        where: { userId: user.id },
      });

      await this.prisma.attachment.create({
        data: {
          title: createAttachmentDto.title,
          url: attachment,
          tutorId: tutor.id,
        },
      });

      return { message: 'Recurso creado exitosamente!' };
    } catch (error) {
      console.error('Error updating attachment:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
