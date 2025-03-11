import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  Put,
  Headers,
} from '@nestjs/common';
import { CoursesService } from '../providers/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CoursePlatformStatus } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private prisma: PrismaService,
  ) {}

  /**
   * Get Course
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  /**
   * Create routes
   */
  @Post('tutor/:tutorId')
  create(
    @Headers('X-User-Id-Audit-Log') userHeader: string,
    @Param('tutorId') tutorId: string,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.coursesService.create(tutorId, createCourseDto, userHeader);
  }

  /**
   * Get routes
   */

  @Get('tutor/:tutorId')
  getCoursesFromTutor(@Param('tutorId') tutorId: string) {
    return this.coursesService.findCoursesFromTutor(tutorId);
  }

  @Get('pending-review')
  findAllWithPendingReview() {
    return this.coursesService.findAllWithPendingReview();
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id/chapters')
  async findOneWithChapters(@Param('id') id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    if (!course) throw new NotFoundException('Curso no encontrado.');

    return course;
  }

  @Get(':id/all')
  async findOneWithAll(@Param('id') id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    if (!course) throw new NotFoundException('Curso no encontrado.');

    return course;
  }

  // Updated every fields
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Put()
  updateProgress(
    @Param('id') id: string,
    @Param('chapterId') chapterId: string,
    @Body() data: any,
  ) {
    return this.coursesService.updateProgress(id, chapterId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  @Delete(':id/attachments/:attachmentId')
  removeAttachment(
    @Param('id') id: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    return this.coursesService.removeAttachment(id, attachmentId);
  }

  /** Routes for Student progress */
  @Get(':studentId/progress/:courseId')
  async getProgress(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    try {
      const publishedChapters = await this.prisma.chapter.findMany({
        where: {
          courseId,
        },
        select: {
          id: true,
        },
      });

      const publishedChaptersIds = publishedChapters.map(
        (chapter) => chapter.id,
      );

      const validCompletedChapters = await this.prisma.studentProgress.count({
        where: {
          studentId,
          chapterId: {
            in: publishedChaptersIds,
          },
          isCompleted: true,
        },
      });

      const progressPercentage =
        (validCompletedChapters / publishedChaptersIds.length) * 100;

      return progressPercentage;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':studentId/levels/:levelId')
  async findCoursesByStudentAndLevel(
    @Param('studentId') studentId: string,
    @Param('levelId') levelId: string,
    @Query('title') title?: string,
  ) {
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          platformStatus: CoursePlatformStatus.PUBLISHED,
          title: {
            contains: title,
          },
          levelId,
        },
        include: {
          level: true,
          chapters: {
            select: {
              id: true,
            },
          },
          purchases: {
            where: {
              studentId,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      console.log(courses);

      return courses;
    } catch (error) {
      console.log(error);
    }
  }
}
