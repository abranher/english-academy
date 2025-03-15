import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { QuizQuestionsService } from '../providers/quiz-questions.service';
import { CreateQuizQuestionDto } from '../dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from '../dto/update-quiz-question.dto';

@Controller('quiz-questions')
export class QuizQuestionsController {
  constructor(private readonly quizQuestionsService: QuizQuestionsService) {}

  /*
   * Create QuizQuestion
   */
  @Post('quiz/:quizId')
  create(
    @Param('quizId') quizId: string,
    @Body() createQuizQuestionDto: CreateQuizQuestionDto,
  ) {
    return this.quizQuestionsService.create(quizId, createQuizQuestionDto);
  }

  /*
   * Update every field
   */
  @Patch(':id/quiz/:quizId')
  update(
    @Param('id') id: string,
    @Param('quizId') quizId: string,
    @Body() updateQuizQuestionDto: UpdateQuizQuestionDto,
  ) {
    return this.quizQuestionsService.update(id, quizId, updateQuizQuestionDto);
  }
}
