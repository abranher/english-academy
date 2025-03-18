import { Controller, Post, Body, Param, Put } from '@nestjs/common';

import { LessonsService } from '../providers/lessons.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  /*
   * Get Lesson for student
   */
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  /*
   * Create Lesson
   */
  @Post('chapter/:chapterId')
  create(
    @Param('chapterId') chapterId: string,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(createLessonDto, chapterId);
  }

  /*
   * Reorder Lessons
   */
  @Put('chapter/:chapterId/reorder')
  reorderLessons(
    @Param('chapterId') chapterId: string,
    @Body() updateChapterDto: UpdateLessonDto,
  ) {
    return this.lessonsService.reorderLessons(chapterId, updateChapterDto);
  }
}
