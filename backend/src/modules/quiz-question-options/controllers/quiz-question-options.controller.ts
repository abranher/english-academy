import { Controller, Post, Body, Param } from '@nestjs/common';

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
}
