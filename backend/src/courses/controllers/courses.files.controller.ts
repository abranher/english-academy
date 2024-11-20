import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from '../providers/courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import {
  attachmentFilter,
  createFileName,
  imageFileFilter,
} from 'libs/storage';

@Controller('courses')
export class CoursesFilesController {
  constructor(
    private readonly coursesService: CoursesService,
    private prisma: PrismaService,
  ) {}

  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('image', {
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
}
