import { Module } from '@nestjs/common';
import { MultipleChoiceExercisesService } from './providers/multiple-choice-exercises.service';
import { MultipleChoiceExercisesController } from './controllers/multiple-choice-exercises.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MultipleChoiceExercisesController],
  providers: [MultipleChoiceExercisesService],
})
export class MultipleChoiceExercisesModule {}
