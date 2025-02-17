import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  Req,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { TutorsFilesService } from '../providers/tutors.files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { attachmentFilter, createFileName } from 'src/libs/storage';

@Controller('tutors/files')
export class TutorsFilesController {
  constructor(private readonly tutorsFilesService: TutorsFilesService) {}

  // Upload image
  @Post('signup/:userId/cv')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: attachmentFilter,
      storage: diskStorage({
        destination: './storage/attachments',
        filename: createFileName,
      }),
    }),
  )
  async uploadCv(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos no permitido]',
      );
    }

    return this.tutorsFilesService.uploadCv(userId, file.filename);
  }
}
