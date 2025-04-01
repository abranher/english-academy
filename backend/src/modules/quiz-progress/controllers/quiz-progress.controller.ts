import { Body, Controller, Get, Param, Put } from '@nestjs/common';

import { QuizProgressService } from '../providers/quiz-progress.service';
import { UpdateQuizProgressDto } from '../dto/update-quiz-progress.dto';

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

  /**
   * Mark a quiz as completed for a student
   */
  @Put('student/:studentId/quiz/:quizId/mark-as-done')
  async markAsCompleted(
    @Param('studentId') studentId: string,
    @Param('quizId') quizId: string,
    @Body() updateQuizProgressDto: UpdateQuizProgressDto,
  ) {
    return this.quizProgressService.updateProgress(
      studentId,
      quizId,
      updateQuizProgressDto,
    );
  }
}
