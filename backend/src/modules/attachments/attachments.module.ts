import { Module } from '@nestjs/common';
import { AttachmentsController } from './controllers/attachments.controller';
import { AttachmentsFilesController } from './controllers/attachments.files.controller';
import { AttachmentsService } from './providers/attachments.service';
import { AttachmentsFilesService } from './providers/attachments.files.service';

@Module({
  controllers: [AttachmentsController, AttachmentsFilesController],
  providers: [AttachmentsService, AttachmentsFilesService],
})
export class AttachmentsModule {}
