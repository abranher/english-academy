import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { deleteFile } from 'src/libs/storage';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class CoursesFilesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findCourseOrThrow(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso no encontrado.');
    return course;
  }

  async uploadImage(id: string, image: string) {
    const course = await this.findCourseOrThrow(id);

    if (course.image) {
      await deleteFile(course.image);
    }

    try {
      await this.prisma.course.update({
        where: { id },
        data: { image },
      });

      return { message: 'Imagen actualizada exitosamente!' };
    } catch (error) {
      console.error('Error updating image of course:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async uploadTrailer(id: string, trailer: string) {
    const course = await this.findCourseOrThrow(id);

    if (course.trailer) {
      await deleteFile(course.trailer, 'videos');
    }

    try {
      await this.prisma.course.update({
        where: { id },
        data: { trailer },
      });

      return { message: 'Trailer actualizado exitosamente!' };
    } catch (error) {
      console.error('Error updating trailer of course:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
