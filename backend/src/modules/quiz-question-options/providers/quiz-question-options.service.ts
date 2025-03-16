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

  private async findQuestionOrThrow(id: string) {
    const question = await this.prisma.quizQuestion.findUnique({
      where: { id },
    });
    if (!question) throw new NotFoundException('Pregunta no encontrada.');
    return question;
  }

  private async findOptionOrThrow(id: string) {
    const option = await this.prisma.quizQuestionOption.findUnique({
      where: { id },
    });
    if (!option) throw new NotFoundException('Opción no encontrada.');
    return option;
  }

  async create(
    quizQuestionId: string,
    createQuizQuestionOptionDto: CreateQuizQuestionOptionDto,
  ) {
    await this.findQuestionOrThrow(quizQuestionId);

    try {
      await this.prisma.quizQuestionOption.create({
        data: { option: createQuizQuestionOptionDto.option, quizQuestionId },
      });

      return { message: 'Opción creada exitosamente!' };
    } catch (error) {
      console.error('Error al crear la opción:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async correctOption(
    quizQuestionId: string,
    updateQuizQuestionOptionDto: UpdateQuizQuestionOptionDto,
  ) {
    await this.findQuestionOrThrow(quizQuestionId);
    await this.findOptionOrThrow(updateQuizQuestionOptionDto.optionId);

    try {
      await this.prisma.quizQuestionOption.update({
        where: { id: updateQuizQuestionOptionDto.optionId, quizQuestionId },
        data: { isCorrect: true },
      });

      return { message: 'Opción correcta actualizada!' };
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
    await this.findQuestionOrThrow(quizQuestionId);

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
