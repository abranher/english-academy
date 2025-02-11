import { ExerciseType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsEnum(ExerciseType)
  type: ExerciseType;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
