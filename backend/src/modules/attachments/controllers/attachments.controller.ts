import { Controller, Get, Param } from '@nestjs/common';

import { AttachmentsService } from '../providers/attachments.service';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';
import { UpdateAttachmentDto } from '../dto/update-attachment.dto';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    return this.attachmentsService.findAll(userId);
  }
}
