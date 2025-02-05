import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ChaptersService } from '../providers/chapters.service';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post('/:courseId')
  create(
    @Param('courseId') courseId: string,
    @Body() createChapterDto: CreateChapterDto,
  ) {
    return this.chaptersService.create(courseId, createChapterDto);
  }

  @Put(':courseId/reorder')
  reorderChapters(
    @Param('courseId') courseId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chaptersService.reorderChapters(courseId, updateChapterDto);
  }

  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Get(':id/course/:courseId')
  findOne(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.chaptersService.findOne(id, courseId);
  }

  @Get(':id/student/:studentId/course/:courseId/')
  findOneWithAll(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.chaptersService.findOneWithAll(id, studentId, courseId);
  }

  @Patch(':id/course/:courseId')
  update(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chaptersService.update(id, courseId, updateChapterDto);
  }

  @Patch(':id/course/:courseId/publish')
  publishChapter(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.chaptersService.publishChapter(id, courseId);
  }

  @Patch(':id/course/:courseId/unpublish')
  unpublishChapter(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
  ) {
    return this.chaptersService.unpublishChapter(id, courseId);
  }

  @Delete(':id/course/:courseId')
  remove(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.chaptersService.remove(id, courseId);
  }
}
