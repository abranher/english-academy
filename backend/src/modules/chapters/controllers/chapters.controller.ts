import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';

import { ChaptersService } from '../providers/chapters.service';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  /*
   * Create Chapter
   */
  @Post('course/:courseId')
  create(
    @Param('courseId') courseId: string,
    @Body() createChapterDto: CreateChapterDto,
  ) {
    return this.chaptersService.create(courseId, createChapterDto);
  }

  /*
   * Reorder Chapters
   */
  @Put('course/:courseId/reorder')
  reorderChapters(
    @Param('courseId') courseId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chaptersService.reorderChapters(courseId, updateChapterDto);
  }

  /*
   * Get Chapter
   */
  @Get(':id/course/:courseId')
  findOne(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.chaptersService.findOne(id, courseId);
  }

  /*
   * Update every field
   */
  @Patch(':id/course/:courseId')
  update(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chaptersService.update(id, courseId, updateChapterDto);
  }
}
