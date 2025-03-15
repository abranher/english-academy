import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { deleteFile } from 'src/libs/storage';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class ClassesFilesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findClassOrThrow(id: string) {
    const lessonClass = await this.prisma.class.findUnique({ where: { id } });
    if (!lessonClass) throw new NotFoundException('Clase no encontrada.');
    return lessonClass;
  }

  async uploadVideo(id: string, video: string) {
    const lessonClass = await this.findClassOrThrow(id);

    if (lessonClass.video) {
      await deleteFile(lessonClass.video, 'videos');
    }

    try {
      await this.prisma.class.update({
        where: { id },
        data: { video },
      });

      return { message: 'Video actualizado exitosamente!' };
    } catch (error) {
      console.error('Error updating video of course:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }
}
