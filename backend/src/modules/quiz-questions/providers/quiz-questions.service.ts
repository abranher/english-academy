import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateQuizQuestionDto } from '../dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from '../dto/update-quiz-question.dto';

@Injectable()
export class QuizQuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findQuizOrThrow(id: string) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz no encontrado.');
    return quiz;
  }

  async create(quizId: string, createQuizQuestionDto: CreateQuizQuestionDto) {
    await this.findQuizOrThrow(quizId);

    try {
      await this.prisma.quizQuestion.create({
        data: { question: createQuizQuestionDto.question, quizId },
      });

      return { message: 'Pregunta creada exitosamente!' };
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async update(
    id: string,
    quizId: string,
    updateQuizQuestionDto: UpdateQuizQuestionDto,
  ) {
    await this.findQuizOrThrow(quizId);

    try {
      return await this.prisma.quizQuestion.update({
        where: { id, quizId },
        data: updateQuizQuestionDto,
      });
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
