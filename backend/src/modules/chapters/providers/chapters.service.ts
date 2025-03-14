import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(courseId: string, createChapterDto: CreateChapterDto) {
    const courseOwner = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!courseOwner) throw new NotFoundException('Curso no encontrado.');

    const lastChapter = await this.prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await this.prisma.chapter.create({
      data: {
        title: createChapterDto.title,
        courseId,
        position: newPosition,
      },
    });

    return chapter;
  }

  async reorderChapters(courseId: string, updateChapterDto: UpdateChapterDto) {
    const { list } = updateChapterDto;

    const ownCourse = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    for (const { id, position } of list) {
      await this.prisma.chapter.update({
        where: {
          id,
        },
        data: {
          position,
        },
      });
    }

    return {
      message: 'Actualización exitosa.',
    };
  }

  async findOne(id: string, courseId: string) {
    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id,
        courseId,
      },
      include: {
        lessons: {
          include: {
            class: true,
            quiz: true,
          },
        },
      },
    });

    return chapter;
  }

  async update(
    id: string,
    courseId: string,
    updateChapterDto: UpdateChapterDto,
  ) {
    const ownCourse = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    const chapter = this.prisma.chapter.update({
      where: {
        id,
        courseId,
      },
      data: updateChapterDto,
    });

    return chapter;
  }

  // Common service
  async findById(id: string) {
    return await this.prisma.chapter.findUnique({
      where: {
        id,
      },
    });
  }
}
