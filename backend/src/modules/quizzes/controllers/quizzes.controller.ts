import { Controller, Get, Body, Patch, Param } from '@nestjs/common';

import { QuizzesService } from '../providers/quizzes.service';
import { UpdateQuizDto } from '../dto/update-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  /*
   * Get Quiz
   */
  @Get(':id/lesson/:lessonId')
  findOne(@Param('id') id: string, @Param('lessonId') lessonId: string) {
    return this.quizzesService.findOne(id, lessonId);
  }

  /*
   * Update every field
   */
  @Patch(':id/lesson/:lessonId')
  update(
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(id, lessonId, updateQuizDto);
  }
}
