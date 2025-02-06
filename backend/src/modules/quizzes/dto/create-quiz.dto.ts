import { LessonType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsEnum(LessonType)
  type: LessonType;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
