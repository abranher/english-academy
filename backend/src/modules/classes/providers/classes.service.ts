import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

import { UpdateClassDto } from '../dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findLessonOrThrow(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lección no encontrada.');
    return lesson;
  }

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

  async findOne(id: string, lessonId: string) {
    await this.findLessonOrThrow(lessonId);

    try {
      return await this.prisma.class.findUnique({
        where: { id, lessonId },
        include: { attachments: { include: { attachment: true } } },
      });
    } catch (error) {
      console.error('Error al obtener la clase:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async update(id: string, lessonId: string, updateClassDto: UpdateClassDto) {
    await this.findLessonOrThrow(lessonId);

    try {
      return await this.prisma.class.update({
        where: { id, lessonId },
        data: updateClassDto,
      });
    } catch (error) {
      console.error('Error al actualizar la clase:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async addAttachments(
    id: string,
    lessonId: string,
    updateClassDto: UpdateClassDto,
  ) {
    await this.findLessonOrThrow(lessonId);

    try {
      await this.prisma.class.update({
        where: { id, lessonId },
        data: {
          attachments: {
            create: {
              attachmentId: updateClassDto.attachmentId,
            },
          },
        },
      });

      return { message: 'Recurso adjuntado!' };
    } catch (error) {
      console.error('Error al actualizar la clase:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
