import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonClassDto } from './create-lesson-class.dto';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLessonClassDto extends PartialType(CreateLessonClassDto) {
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
