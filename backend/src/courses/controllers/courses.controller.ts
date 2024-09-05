import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CoursesService } from '../providers/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import {
  attachmentFilter,
  createFileName,
  imageFileFilter,
} from 'libs/storage';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private prisma: PrismaService,
  ) {}

  /**
   * Create routes
   */

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './storage/images',
        filename: createFileName,
      }),
    }),
  )
  async uploadImage(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos de imagen permitidos]',
      );
    }

    return this.coursesService.uploadImage(id, file.filename);
  }

  @Post(':id/attachments')
  @UseInterceptors(
    FileInterceptor('url', {
      fileFilter: attachmentFilter,
      storage: diskStorage({
        destination: './storage/attachments',
        filename: createFileName,
      }),
    }),
  )
  createAttachment(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos de imagen permitidos]',
      );
    }

    return this.coursesService.createAttachment(id, file.filename);
  }

  /**
   * Get routes
   */

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Get(':id/all')
  async findOneWithAll(@Param('id') id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            studentProgress: {
              where: {
                id: '',
              },
            },
          },
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

  @Patch(':id/publish')
  publishCourse(@Param('id') id: string) {
    return this.coursesService.publishCourse(id);
  }

  @Patch(':id/unpublish')
  unpublishCourse(@Param('id') id: string) {
    return this.coursesService.unpublishCourse(id);
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
          isPublished: true,
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
          isPublished: true,
          title: {
            contains: title,
          },
          levelId,
        },
        include: {
          level: true,
          chapters: {
            where: {
              isPublished: true,
            },
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

      return courses;
    } catch (error) {
      console.log(error);
    }
  }
}
