import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';
import { UpdateAttachmentDto } from '../dto/update-attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserOrThrow(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    return user;
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
}
