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
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import {
  attachmentFilter,
  createFileName,
  videoFileFilter,
} from 'libs/storage';
import { LessonsFilesService } from '../providers/lessons.files.service';

@Controller('lessons')
export class LessonsFilesController {
  constructor(
    private readonly lessonsFilesService: LessonsFilesService,
    private prisma: PrismaService,
  ) {}

  // Upload trailer
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
  async uploadVideo(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos de video permitidos]',
      );
    }

    return this.lessonsFilesService.uploadVideo(id, file.filename);
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

    return this.lessonsFilesService.createAttachment(id, file.filename);
  }
}
