import { Controller, Post, Body, Param, Patch } from '@nestjs/common';

import { QuizQuestionOptionsService } from '../providers/quiz-question-options.service';
import { CreateQuizQuestionOptionDto } from '../dto/create-quiz-question-option.dto';
import { UpdateQuizQuestionOptionDto } from '../dto/update-quiz-question-option.dto';

@Controller('quiz-question-options')
export class QuizQuestionOptionsController {
  constructor(
    private readonly quizQuestionOptionsService: QuizQuestionOptionsService,
  ) {}

  /*
   * Create QuizQuestionOption
   */
  @Post('quiz-question/:quizQuestionId')
  create(
    @Param('quizQuestionId') quizQuestionId: string,
    @Body() createQuizQuestionOptionDto: CreateQuizQuestionOptionDto,
  ) {
    return this.quizQuestionOptionsService.create(
      quizQuestionId,
      createQuizQuestionOptionDto,
    );
  }

  /*
   * Update every field
   */
  @Patch(':id/quiz-question/:quizQuestionId')
  update(
    @Param('id') id: string,
    @Param('quizQuestionId') quizQuestionId: string,
    @Body() updateQuizQuestionOptionDto: UpdateQuizQuestionOptionDto,
  ) {
    return this.quizQuestionOptionsService.update(
      id,
      quizQuestionId,
      updateQuizQuestionOptionDto,
    );
  }
}
