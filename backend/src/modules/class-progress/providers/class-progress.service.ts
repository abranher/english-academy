import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

@Injectable()
export class ClassProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infrastructureService: InfrastructureService,
  ) {}

  async findOne(studentId: string, classId: string) {
    await this.infrastructureService.findStudentOrThrow(studentId);
    await this.infrastructureService.findClassOrThrow(classId);

    try {
      const classData = await this.prisma.class.findUnique({
        where: { id: classId },
        include: {
          attachments: true,
          classProgress: { where: { studentId }, take: 1 },
        },
      });

      return {
        ...classData,
        classProgress: classData.classProgress[0] || null,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  async updateProgress(studentId: string, classId: string) {
    await this.infrastructureService.findStudentOrThrow(studentId);
    await this.infrastructureService.findClassOrThrow(classId);

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
