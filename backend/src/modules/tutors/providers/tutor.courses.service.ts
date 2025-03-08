import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Roles, TutorStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class TutorCoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    try {
      const user = await this.findUserTutor(userId);

      const tutor = await this.prisma.tutor.findUnique({
        where: { userId: user.id },
      });

      return await this.prisma.course.findMany({
        where: { tutorId: tutor.id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los cursos:',
        error,
      );
    }
  }

  async findByStatus(status: TutorStatus) {
    if (status === TutorStatus.NEW)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.NEW } },
        include: { tutor: true },
      });
    else if (status === TutorStatus.PENDING)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.PENDING } },
        include: { tutor: true },
      });
    else if (status === TutorStatus.RESUBMITTED)
      return this.prisma.user.findMany({
        where: {
          role: Roles.TUTOR,
          tutor: { status: TutorStatus.RESUBMITTED },
        },
        include: { tutor: true },
      });
    else if (status === TutorStatus.APPROVED)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.APPROVED } },
        include: { tutor: true },
      });
    else if (status === TutorStatus.REJECTED)
      return this.prisma.user.findMany({
        where: { role: Roles.TUTOR, tutor: { status: TutorStatus.REJECTED } },
        include: { tutor: true },
      });
  }

  async findUserTutor(userId: string) {
    const tutorUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!tutorUser) throw new NotFoundException('Usuario no encontrado.');

    return tutorUser;
  }
}
