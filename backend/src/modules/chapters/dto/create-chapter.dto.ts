import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  position?: number;
}
