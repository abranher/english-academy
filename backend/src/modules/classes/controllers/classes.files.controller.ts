import {
  Controller,
  Param,
  Post,
  UseInterceptors,
  Req,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { createFileName, videoFileFilter } from 'src/libs/storage';

import { ClassesFilesService } from '../providers/classes.files.service';

@Controller('classes/files')
export class ClassesFilesController {
  constructor(private readonly classesFilesService: ClassesFilesService) {}

  // Upload video
  @Post(':id/video')
  @UseInterceptors(
    FileInterceptor('video', {
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
        'Archivo proporcionado no válido, [archivos de video permitido]',
      );
    }

    return this.classesFilesService.uploadVideo(id, file.filename);
  }
}
