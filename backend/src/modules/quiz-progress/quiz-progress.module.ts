import { Module } from '@nestjs/common';
import { QuizProgressService } from './providers/quiz-progress.service';
import { QuizProgressController } from './controllers/quiz-progress.controller';

@Module({
  controllers: [QuizProgressController],
  providers: [QuizProgressService],
})
export class QuizProgressModule {}
