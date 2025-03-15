import { Module } from '@nestjs/common';
import { QuizQuestionsService } from './providers/quiz-questions.service';
import { QuizQuestionsController } from './controllers/quiz-questions.controller';

@Module({
  controllers: [QuizQuestionsController],
  providers: [QuizQuestionsService],
})
export class QuizQuestionsModule {}
