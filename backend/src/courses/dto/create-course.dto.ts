import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
