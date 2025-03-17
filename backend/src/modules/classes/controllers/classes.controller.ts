import { Controller, Body, Patch, Param, Get, Post } from '@nestjs/common';

import { ClassesService } from '../providers/classes.service';
import { UpdateClassDto } from '../dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  /*
   * Get Class
   */
  @Get(':id/lesson/:lessonId')
  findOne(@Param('id') id: string, @Param('lessonId') lessonId: string) {
    return this.classesService.findOne(id, lessonId);
  }

  /*
   * Update every field
   */
  @Patch(':id/lesson/:lessonId')
  update(
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(id, lessonId, updateClassDto);
  }

  /*
   * Add attachment
   */
  @Post(':id/lesson/:lessonId/attachment')
  addAttachments(
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.addAttachments(id, lessonId, updateClassDto);
  }

  /*
   * Add attachment
   */
  @Post(':id/attachment/:attachmentId')
  deleteAttachment(
    @Param('id') id: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    return this.classesService.deleteAttachment(id, attachmentId);
  }
}
