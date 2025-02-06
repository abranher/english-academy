import { Module } from '@nestjs/common';
import { QuizzesService } from './providers/quizzes.service';
import { QuizzesController } from './controllers/quizzes.controller';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
