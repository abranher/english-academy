import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import {
  createFileName,
  imageFileFilter,
  videoFileFilter,
} from 'src/libs/storage';

import { CoursesFilesService } from '../providers/courses.files.service';

@Controller('courses/files')
export class CoursesFilesController {
  constructor(private readonly coursesFilesService: CoursesFilesService) {}

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
}
