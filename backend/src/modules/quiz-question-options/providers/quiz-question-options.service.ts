import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateQuizQuestionOptionDto } from '../dto/create-quiz-question-option.dto';
import { UpdateQuizQuestionOptionDto } from '../dto/update-quiz-question-option.dto';

@Injectable()
export class QuizQuestionOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findQuizQuestionOrThrow(id: string) {
    const quizQuestion = await this.prisma.quizQuestion.findUnique({
      where: { id },
    });
    if (!quizQuestion) throw new NotFoundException('Pregunta no encontrada.');
    return quizQuestion;
  }

  async create(
    quizQuestionId: string,
    createQuizQuestionOptionDto: CreateQuizQuestionOptionDto,
  ) {
    await this.findQuizQuestionOrThrow(quizQuestionId);

    try {
      await this.prisma.quizQuestionOption.create({
        data: { option: createQuizQuestionOptionDto.option, quizQuestionId },
      });

      return { message: 'Opción creada exitosamente!' };
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async update(
    id: string,
    quizQuestionId: string,
    updateQuizQuestionOptionDto: UpdateQuizQuestionOptionDto,
  ) {
    await this.findQuizQuestionOrThrow(quizQuestionId);

    try {
      return await this.prisma.quizQuestionOption.update({
        where: { id, quizQuestionId },
        data: updateQuizQuestionOptionDto,
      });
    } catch (error) {
      console.error('Error al actualizar la opción:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
