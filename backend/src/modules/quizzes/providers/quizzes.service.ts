import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UpdateQuizDto } from '../dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findLessonOrThrow(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lección no encontrada.');
    return lesson;
  }

  async findOne(id: string, lessonId: string) {
    await this.findLessonOrThrow(lessonId);

    try {
      return await this.prisma.quiz.findUnique({
        where: { id, lessonId },
        include: { questions: { include: { options: true } } },
      });
    } catch (error) {
      console.error('Error al obtener el quiz:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async update(id: string, lessonId: string, updateQuizDto: UpdateQuizDto) {
    await this.findLessonOrThrow(lessonId);

    try {
      return await this.prisma.quiz.update({
        where: { id, lessonId },
        data: updateQuizDto,
      });
    } catch (error) {
      console.error('Error al actualizar el quiz:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
