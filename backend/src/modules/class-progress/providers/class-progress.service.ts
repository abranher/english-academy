import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';

@Injectable()
export class ClassProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
  ) {}

  async findOne(studentId: string, classId: string) {
    await this.InfrastructureService.findStudentOrThrow(studentId);
    await this.InfrastructureService.findClassOrThrow(classId);

    try {
      return await this.prisma.class.findUnique({
        where: { id: classId },
        include: { classProgress: { where: { studentId: studentId } } },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
