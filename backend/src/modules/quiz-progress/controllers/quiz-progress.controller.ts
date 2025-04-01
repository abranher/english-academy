import { Controller, Get, Param } from '@nestjs/common';

import { QuizProgressService } from '../providers/quiz-progress.service';

@Controller('quiz-progress')
export class QuizProgressController {
  constructor(private readonly quizProgressService: QuizProgressService) {}

  /**
   * Get Quiz with QuizProgress
   */
  @Get('student/:studentId/quiz/:quizId')
  findOne(
    @Param('studentId') studentId: string,
    @Param('quizId') quizId: string,
  ) {
    return this.quizProgressService.findOne(studentId, quizId);
  }
}
