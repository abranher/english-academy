import { Module } from '@nestjs/common';
import { QuizzesService } from './providers/quizzes.service';
import { QuizzesController } from './controllers/quizzes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
