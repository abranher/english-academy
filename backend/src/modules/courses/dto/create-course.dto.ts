import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  requirements: string;

  @IsOptional()
  @IsString()
  learningObjectives: string;

  @IsOptional()
  @IsString()
  priceId: string;

  @IsOptional()
  @IsString()
  levelId: string;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  subcategoryId: string;
}
