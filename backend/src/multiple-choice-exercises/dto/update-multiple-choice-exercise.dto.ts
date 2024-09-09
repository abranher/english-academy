import { PartialType } from '@nestjs/mapped-types';
import { CreateMultipleChoiceExerciseDto } from './create-multiple-choice-exercise.dto';

export class UpdateMultipleChoiceExerciseDto extends PartialType(CreateMultipleChoiceExerciseDto) {}
