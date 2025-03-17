import { Controller, Delete, Get, Param } from '@nestjs/common';

import { AttachmentsService } from '../providers/attachments.service';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  /*
   * Get Attachments
   */
  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    return this.attachmentsService.findAll(userId);
  }

  /*
   * Delete Attachment
   */
  @Delete(':id/user/:userId')
  async deleteAttachment(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.attachmentsService.deleteAttachment(id, userId);
  }
}
