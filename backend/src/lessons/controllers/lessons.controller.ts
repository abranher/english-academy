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
import { LessonsService } from '../providers/lessons.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('chapter/:chapterId')
  create(
    @Param('chapterId') chapterId: string,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(createLessonDto, chapterId);
  }

  @Put(':chapterId/reorder')
  reorderLessons(
    @Param('chapterId') chapterId: string,
    @Body() updateChapterDto: UpdateLessonDto,
  ) {
    return this.lessonsService.reorderChapters(chapterId, updateChapterDto);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id/chapter/:chapterId')
  findOne(@Param('id') id: string, @Param('chapterId') chapterId: string) {
    return this.lessonsService.findOne(id, chapterId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
