import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CourseReviewStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class CourseReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findCourseById(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) throw new NotFoundException('Curso no encontrado.');

    return course;
  }

  async create(courseId: string) {
    const course = await this.findCourseById(courseId);

    try {
      await this.prisma.courseReview.create({
        data: { courseId: course.id },
      });

      await this.prisma.course.update({
        where: { id: course.id },
        data: { reviewStatus: CourseReviewStatus.PENDING_REVIEW },
      });

      return { message: 'Curso enviado a revisión!' };
    } catch (error) {
      throw new InternalServerErrorException('Error enviando a revisión');
    }
  }

  async findAll(courseId: string) {
    const course = await this.findCourseById(courseId);

    try {
      return await this.prisma.courseReview.findMany({
        where: { courseId: course.id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al cargar el historial');
    }
  }
}
