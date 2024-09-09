import { Injectable } from '@nestjs/common';
import { CreateMultipleChoiceExerciseDto } from '../dto/create-multiple-choice-exercise.dto';
import { UpdateMultipleChoiceExerciseDto } from '../dto/update-multiple-choice-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MultipleChoiceExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMultipleChoiceExerciseDto: CreateMultipleChoiceExerciseDto) {
    return 'This action adds a new multipleChoiceExercise';
  }

  findAll() {
    return `This action returns all multipleChoiceExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multipleChoiceExercise`;
  }

  update(
    id: number,
    updateMultipleChoiceExerciseDto: UpdateMultipleChoiceExerciseDto,
  ) {
    return `This action updates a #${id} multipleChoiceExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} multipleChoiceExercise`;
  }
}
