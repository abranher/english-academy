import { Controller, Param, Delete } from '@nestjs/common';

import { ClassAttachmentsService } from '../providers/class-attachments.service';

@Controller('class-attachments')
export class ClassAttachmentsController {
  constructor(
    private readonly classAttachmentsService: ClassAttachmentsService,
  ) {}

  // Delete ClassAttachment
  @Delete(':id/class/:classId/attachment/:attachmentId')
  remove(
    @Param('id') id: string,
    @Param('classId') classId: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    return this.classAttachmentsService.remove(id, classId, attachmentId);
  }
}
