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
} from '@nestjs/common';
import { CoursesService } from '../providers/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

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
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          req.fileValidationError = 'Solo se permiten archivos de imagen';
          return callback(null, false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: './storage/images',
        filename: (req, file, cb) => {
          const fileName = `${randomUUID()}.${file.originalname.split('.')[1]}`;
          console.log(fileName);
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadImage(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos de imagen permitidos]',
      );
    }
    return file.originalname;
    console.log(file.originalname.split('.')[1]);
    console.log(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/));
  }

  @Post(':id/attachments')
  createAttachment(@Param('id') id: string) {
    return this.coursesService.createAttachment(id, '');
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }

  @Delete(':id/attachments/:attachmentId')
  removeAttachment(
    @Param('id') id: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    return this.coursesService.removeAttachment(id, attachmentId);
  }
}
