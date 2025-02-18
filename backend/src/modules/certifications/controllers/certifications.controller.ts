import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CertificationsService } from '../providers/certifications.service';
import { CreateCertificationDto } from '../dto/create-certification.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { attachmentFilter, createFileName } from 'src/libs/storage';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post(':userId')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: attachmentFilter,
      storage: diskStorage({
        destination: './storage/attachments',
        filename: createFileName,
      }),
    }),
  )
  async uploadCertification(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body() createCertificationDto: CreateCertificationDto,
    @Param('userId') userId: string,
  ) {
    if (!file) throw new BadRequestException('Todos los campos son requeridos');

    return this.certificationsService.createCertification(
      userId,
      file.filename,
      createCertificationDto,
    );
  }

  @Get(':userId/tutor')
  async getCertificationsByTutor(@Param('userId') userId: string) {
    return this.certificationsService.getCertificationsByTutor(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.certificationsService.remove(id);
  }
}
