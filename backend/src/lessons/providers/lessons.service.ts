import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LessonStatus, LessonType } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto, chapterId: string) {
    const chapterOwner = await this.prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapterOwner) throw new NotFoundException('Capítulo no encontrado.');

    const lastLesson = await this.prisma.lesson.findFirst({
      where: {
        chapterId,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const newPosition = lastLesson ? lastLesson.position + 1 : 1;

    if (createLessonDto.type === LessonType.CLASS) {
      const lesson = await this.prisma.lesson.create({
        data: {
          type: LessonType.CLASS,
          position: newPosition,
          status: LessonStatus.DRAFT,
          chapterId,
        },
      });

      const $class = await this.prisma.class.create({
        data: {
          title: createLessonDto.title,
          lessonId: lesson.id,
        },
      });

      return { lesson, $class };
    } else if (createLessonDto.type === LessonType.QUIZ) {
      const lesson = await this.prisma.lesson.create({
        data: {
          type: LessonType.QUIZ,
          position: newPosition,
          status: LessonStatus.DRAFT,
          chapterId,
        },
      });

      const quiz = await this.prisma.quiz.create({
        data: {
          title: createLessonDto.title,
          lessonId: lesson.id,
        },
      });

      return { lesson, quiz };
    }
  }

  findAll() {
    return `This action returns all lessons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
