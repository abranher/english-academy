import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CoursesFilesService } from '../providers/courses.files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import {
  attachmentFilter,
  createFileName,
  imageFileFilter,
  videoFileFilter,
} from 'libs/storage';

@Controller('courses')
export class CoursesFilesController {
  constructor(
    private readonly coursesFilesService: CoursesFilesService,
    private prisma: PrismaService,
  ) {}

  // Upload image
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

    return this.coursesFilesService.uploadImage(id, file.filename);
  }

  // Upload trailer
  @Post(':id/trailer')
  @UseInterceptors(
    FileInterceptor('trailer', {
      fileFilter: videoFileFilter,
      storage: diskStorage({
        destination: './storage/videos',
        filename: createFileName,
      }),
    }),
  )
  async uploadTrailer(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos de video permitidos]',
      );
    }

    return this.coursesFilesService.uploadTrailer(id, file.filename);
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

    return this.coursesFilesService.createAttachment(id, file.filename);
  }
}
