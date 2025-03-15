import { Controller, Body, Patch, Param, Get } from '@nestjs/common';

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
}
