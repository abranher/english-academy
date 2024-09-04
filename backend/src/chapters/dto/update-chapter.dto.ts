import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterDto } from './create-chapter.dto';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @IsArray()
  @ValidateNested({ each: true })
  list: UpdateChapterItemDto[];
}

export class UpdateChapterItemDto {
  @IsString()
  id: string;

  @IsInt()
  position: number;
}
