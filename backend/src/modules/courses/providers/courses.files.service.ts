import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class CoursesFilesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findCourseOrThrow(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso no encontrado.');
    return course;
  }

  // delete files
  private async deleteFile(filename: string) {
    const fs = await import('fs/promises');
    const path = await import('path');

    try {
      await fs.unlink(path.join(process.cwd(), 'storage/images', filename));
    } catch (err) {
      console.error(`Error eliminando archivo ${filename}:`, err);
    }
  }

  async uploadImage(id: string, image: string) {
    const course = await this.findCourseOrThrow(id);

    if (course.image) {
      await this.deleteFile(course.image);
    }

    try {
      await this.prisma.course.update({
        where: { id },
        data: { image },
      });
    } catch (error) {
      console.error('Error updating image of course:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Imagen actualizada exitosamente!' };
  }

  async uploadTrailer(id: string, trailer: string) {
    const course = await this.findCourseOrThrow(id);

    if (course.trailer) {
      await this.deleteFile(course.image);
    }

    try {
      await this.prisma.course.update({
        where: { id },
        data: { trailer },
      });
    } catch (error) {
      console.error('Error updating trailer of course:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Trailer actualizado exitosamente!' };
  }
}
