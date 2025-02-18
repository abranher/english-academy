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
import {
  attachmentFilter,
  createFileName,
  imageFileFilter,
} from 'src/libs/storage';

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

    return this.tutorsFilesService.uploadAvatar(userId, file.filename);
  }
}
