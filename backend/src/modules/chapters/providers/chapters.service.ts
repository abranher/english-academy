import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(private readonly prisma: PrismaService) {}

  private async findCourseOrThrow(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso no encontrado.');
    return course;
  }

  async create(courseId: string, createChapterDto: CreateChapterDto) {
    await this.findCourseOrThrow(courseId);

    try {
      const lastChapter = await this.prisma.chapter.findFirst({
        where: { courseId },
        orderBy: { position: 'desc' },
      });

      const newPosition = lastChapter ? lastChapter.position + 1 : 1;

      await this.prisma.chapter.create({
        data: {
          title: createChapterDto.title,
          courseId,
          position: newPosition,
        },
      });

      return { message: 'Capítulo creado exitosamente!' };
    } catch (error) {
      console.error('Error al crear el capítulo:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async reorderChapters(courseId: string, updateChapterDto: UpdateChapterDto) {
    await this.findCourseOrThrow(courseId);

    try {
      const { list } = updateChapterDto;

      for (const { id, position } of list) {
        await this.prisma.chapter.update({
          where: { id },
          data: { position },
        });
      }

      return { message: 'Capítulos reordenados.' };
    } catch (error) {
      console.error('Error reordenar los capítulos:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async findOne(id: string, courseId: string) {
    await this.findCourseOrThrow(courseId);

    try {
      return await this.prisma.chapter.findUnique({
        where: { id, courseId },
        include: {
          lessons: { include: { class: true, quiz: true } },
        },
      });
    } catch (error) {
      console.error('Error al obtener el capítulo:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async update(
    id: string,
    courseId: string,
    updateChapterDto: UpdateChapterDto,
  ) {
    await this.findCourseOrThrow(courseId);

    try {
      return await this.prisma.chapter.update({
        where: { id, courseId },
        data: updateChapterDto,
      });
    } catch (error) {
      console.error('Error al actualizar el capítulo:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
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
