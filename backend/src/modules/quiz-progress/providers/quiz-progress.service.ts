import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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
      // Check if progress record already exists
      const existingProgress = await this.prisma.classProgress.findUnique({
        where: { studentId_classId: { studentId, classId } },
      });

      if (existingProgress) {
        // Update existing progress
        await this.prisma.classProgress.update({
          where: { id: existingProgress.id },
          data: { isCompleted: true },
        });
      } else {
        // Create new progress record
        await this.prisma.classProgress.create({
          data: { studentId, classId, isCompleted: true },
        });
      }

      return { message: 'Progreso actualizado!' };
    } catch (error) {
      throw new NotFoundException(
        'No se pudo actualizar el progreso de la clase. Por favor intenta nuevamente.',
      );
    }
  }
}
