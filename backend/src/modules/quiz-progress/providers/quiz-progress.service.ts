import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { UpdateQuizProgressDto } from '../dto/update-quiz-progress.dto';

@Injectable()
export class QuizProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async findOne(studentId: string, quizId: string) {
    await this.infrastructureService.findStudentOrThrow(studentId);
    await this.infrastructureService.findQuizOrThrow(quizId);

    try {
      const quizData = await this.prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
          quizProgress: { where: { studentId }, take: 1 },
          questions: {
            include: { options: true },
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      const formattedQuestions = quizData.questions.map((question, index) => ({
        id: index + 1, // Usar índice +1 como ID (o podrías usar question.id)
        question: question.question,
        answers: question.options.map((opt) => opt.option),
        correctAnswer: question.options.findIndex((opt) => opt.isCorrect),
        points: question.points,
      }));

      return {
        ...quizData,
        questions: formattedQuestions,
        quizProgress: quizData.quizProgress[0] || null,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async updateProgress(
    studentId: string,
    quizId: string,
    updateQuizProgressDto: UpdateQuizProgressDto,
  ) {
    await this.infrastructureService.findStudentOrThrow(studentId);
    await this.infrastructureService.findQuizOrThrow(quizId);

    try {
      const existingProgress = await this.prisma.quizProgress.findUnique({
        where: { studentId_quizId: { studentId, quizId } },
      });

      if (existingProgress) {
        await this.prisma.quizProgress.delete({
          where: { id: existingProgress.id },
        });
      }

      await this.prisma.quizProgress.create({
        data: {
          studentId,
          quizId,
          isCompleted: true,
          earnedPoints: updateQuizProgressDto.earnedPoints,
        },
      });

      return { message: 'Progreso del quiz guardado correctamente!' };
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo guardar el progreso del quiz. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
