import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterDto } from './create-chapter.dto';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @IsArray()
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
