import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { attachmentFilter, createFileName } from 'src/libs/storage';

import { AttachmentsFilesService } from '../providers/attachments.files.service';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

@Controller('attachments/files')
export class AttachmentsFilesController {
  constructor(
    private readonly attachmentsFilesService: AttachmentsFilesService,
  ) {}

  // Upload attachment
  @Post('user/:userId/attachment')
  @UseInterceptors(
    FileInterceptor('attachment', {
      fileFilter: attachmentFilter,
      storage: diskStorage({
        destination: './storage/attachments',
        filename: createFileName,
      }),
    }),
  )
  async uploadAttachment(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
    @Body() createAttachmentDto: CreateAttachmentDto,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'Archivo proporcionado no válido, [archivos de imagen permitidos]',
      );
    }

    return this.attachmentsFilesService.uploadAttachment(
      userId,
      file.filename,
      createAttachmentDto,
    );
  }
}
