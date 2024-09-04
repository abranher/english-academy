import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsInt()
  position: number;

  @IsOptional()
  isPublished: boolean;

  @IsOptional()
  isFree: boolean;

  @IsString()
  courseId: string;
}
