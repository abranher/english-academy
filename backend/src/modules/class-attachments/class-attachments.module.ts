import { Module } from '@nestjs/common';
import { ClassAttachmentsService } from './providers/class-attachments.service';
import { ClassAttachmentsController } from './controllers/class-attachments.controller';

@Module({
  controllers: [ClassAttachmentsController],
  providers: [ClassAttachmentsService],
})
export class ClassAttachmentsModule {}
