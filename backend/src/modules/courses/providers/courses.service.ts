import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { activityLogMessages } from 'src/libs/activity-logs';
import { CoursePlatformStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { ActivityLogsService } from 'src/modules/activity-logs/providers/activity-logs.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infrastructureService: InfrastructureService,
    private readonly activityLogsService: ActivityLogsService,
  ) {}

  private async verifyCourseOwnership(tutorId: string, courseId: string) {
    const course = await this.prisma.course.findFirst({
      where: { id: courseId, tutorId },
    });

    if (!course)
      throw new ForbiddenException(
        'No tienes permiso para modificar este curso.',
      );
  }

  /**
   * Create Course
   */
  async create(
    tutorId: string,
    createCourseDto: CreateCourseDto,
    userHeader: string,
  ) {
    try {
      const course = await this.prisma.course.create({
        data: { title: createCourseDto.title, tutorId },
      });

      this.activityLogsService.create(
        userHeader,
        activityLogMessages['course_create'],
      );

      return { message: 'Curso creado!', course };
    } catch (error) {
      console.error('Error creando el curso:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  /**
   * Get Course for landing page
   */
  async findOne(id: string) {
    await this.infrastructureService.findCourseOrThrow(id);

    try {
      return await this.prisma.course.findUnique({
        where: { id },
        include: {
          category: true,
          subcategory: true,
          price: true,
          chapters: {
            orderBy: { position: 'asc' },
            include: { lessons: { include: { class: true, quiz: true } } },
          },
        },
      });
    } catch (error) {
      console.error('Error obteniendo el curso:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  /**
   * Update every field
   */
  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.infrastructureService.findCourseOrThrow(id);

    try {
      return await this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
      });
    } catch (error) {
      console.error('Error actualizando el curso:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  /**
   * Publish a course
   */
  async publishCourse(id: string, tutorId: string, userHeader: string) {
    await this.infrastructureService.findTutorOrThrow(tutorId);
    await this.verifyCourseOwnership(tutorId, id);

    try {
      await this.prisma.course.update({
        where: { id },
        data: {
          platformStatus: CoursePlatformStatus.PUBLISHED,
          publishedAt: new Date(),
        },
      });

      this.activityLogsService.create(
        userHeader,
        activityLogMessages['course_publish'],
      );

      return { message: 'Curso publicado exitosamente!' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor al publicar el curso. Por favor intenta nuevamente.',
        error,
      );
    }
  }

  /**
   * Archive a course
   */
  async archiveCourse(id: string, tutorId: string, userHeader: string) {
    await this.infrastructureService.findTutorOrThrow(tutorId);
    await this.verifyCourseOwnership(tutorId, id);

    try {
      await this.prisma.course.update({
        where: { id },
        data: { platformStatus: CoursePlatformStatus.ARCHIVED },
      });

      this.activityLogsService.create(
        userHeader,
        activityLogMessages['course_archive'],
      );

      return { message: 'Curso archivado exitosamente!' };
    } catch (error) {
      console.error('Error archivando el curso:', error);
      throw new InternalServerErrorException(
        'Error del servidor al archivar el curso. Por favor intenta nuevamente.',
      );
    }
  }
}
