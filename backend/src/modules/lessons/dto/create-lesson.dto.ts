import { LessonType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsEnum(LessonType)
  type: LessonType;

  @IsNotEmpty()
  @IsString()
  title: string;
}
