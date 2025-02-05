import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsArray()
  @IsOptional()
  @Type(() => UpdateLessonItemDto)
  @ValidateNested({ each: true })
  list: UpdateLessonItemDto[];
}

export class UpdateLessonItemDto {
  @IsString()
  id: string;

  @IsInt()
  position: number;
}
