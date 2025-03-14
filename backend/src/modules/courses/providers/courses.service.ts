import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { activityLogMessages } from 'src/libs/activity-logs';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { ActivityLogsService } from 'src/modules/activity-logs/providers/activity-logs.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLogsService: ActivityLogsService,
  ) {}

  private async findCourseOrThrow(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso no encontrado.');
    return course;
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
   * Get Course
   */
  async findOne(id: string) {
    await this.findCourseOrThrow(id);

    try {
      return await this.prisma.course.findUnique({
        where: { id },
        include: {
          category: true,
          subcategory: true,
          price: true,
          chapters: {
            orderBy: { position: 'asc' },
            include: {
              lessons: {
                include: { class: true, quiz: true },
              },
            },
          },
          attachments: { orderBy: { createdAt: 'desc' } },
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
    await this.findCourseOrThrow(id);

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
}
