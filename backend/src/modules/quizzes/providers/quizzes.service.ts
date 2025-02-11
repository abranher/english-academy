import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { ExerciseType } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  async createExercise(id: string, createQuizDto: CreateQuizDto) {
    const ownQuiz = await this.prisma.quiz.findUnique({
      where: {
        id,
      },
    });

    if (!ownQuiz) throw new NotFoundException('Quiz no encontrado.');

    if (createQuizDto.type === ExerciseType.MULTIPLE_CHOICE) {
      const multipleChoice = await this.prisma.multipleChoiceQuestion.create({
        data: {
          quizId: ownQuiz.id,
        },
      });

      return multipleChoice;
    }
  }

  findAll() {
    return `This action returns all quizzes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  async update(id: string, lessonId: string, updateQuizDto: UpdateQuizDto) {
    const ownLesson = await this.prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!ownLesson) throw new NotFoundException('Lección no encontrada.');

    const lessonQuiz = await this.prisma.quiz.update({
      where: {
        id,
        lessonId: ownLesson.id,
      },
      data: updateQuizDto,
    });

    return lessonQuiz;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
