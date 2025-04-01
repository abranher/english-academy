import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsOptional()
  @IsNumber()
  points: number;
}
