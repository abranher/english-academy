import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { LessonType } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findChapterOrThrow(id: string) {
    const chapter = await this.prisma.chapter.findUnique({ where: { id } });
    if (!chapter) throw new NotFoundException('Capítulo no encontrado.');
    return chapter;
  }

  async create(createLessonDto: CreateLessonDto, chapterId: string) {
    await this.findChapterOrThrow(chapterId);

    try {
      const lastLesson = await this.prisma.lesson.findFirst({
        where: { chapterId },
        orderBy: { position: 'desc' },
      });

      const newPosition = lastLesson ? lastLesson.position + 1 : 1;

      if (createLessonDto.type === LessonType.CLASS) {
        await this.prisma.lesson.create({
          data: {
            type: LessonType.CLASS,
            position: newPosition,
            chapterId,
            class: { create: { title: createLessonDto.title } },
          },
        });

        return { message: 'Clase creada exitosamente!' };
      } else if (createLessonDto.type === LessonType.QUIZ) {
        await this.prisma.lesson.create({
          data: {
            type: LessonType.QUIZ,
            position: newPosition,
            chapterId,
            quiz: { create: { title: createLessonDto.title } },
          },
        });

        return { message: 'Quiz creado exitosamente!' };
      }
    } catch (error) {
      console.error('Error al crear la lección:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async reorderLessons(chapterId: string, updateLessonDto: UpdateLessonDto) {
    await this.findChapterOrThrow(chapterId);

    try {
      const { list } = updateLessonDto;

      for (const { id, position } of list) {
        await this.prisma.lesson.update({
          where: { id },
          data: { position },
        });
      }

      return { message: 'Lecciones reordenadas.' };
    } catch (error) {
      console.error('Error al reordenar las lecciones:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
