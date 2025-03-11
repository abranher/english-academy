import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  Req,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { createFileName, imageFileFilter } from 'src/libs/storage';
import { StudentsFilesService } from '../providers/students.files.service';

@Controller('students/files')
export class StudentsFilesController {
  constructor(private readonly studentsFilesService: StudentsFilesService) {}

  // Upload image
  @Post('signup/:userId/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './storage/images',
        filename: createFileName,
      }),
    }),
  )
  async uploadAvatar(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos de imagen no permitido]',
      );
    }

    return this.studentsFilesService.uploadAvatar(userId, file.filename);
  }
}
