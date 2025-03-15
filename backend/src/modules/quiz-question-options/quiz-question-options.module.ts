import { Module } from '@nestjs/common';
import { QuizQuestionOptionsService } from './providers/quiz-question-options.service';
import { QuizQuestionOptionsController } from './controllers/quiz-question-options.controller';

@Module({
  controllers: [QuizQuestionOptionsController],
  providers: [QuizQuestionOptionsService],
})
export class QuizQuestionOptionsModule {}
