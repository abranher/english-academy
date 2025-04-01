import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNumber()
  points: number;
}
