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
  @Type(() => UpdateChapterItemDto)
  @ValidateNested({ each: true })
  list: UpdateChapterItemDto[];
}

export class UpdateChapterItemDto {
  @IsString()
  id: string;

  @IsInt()
  position: number;
}
