import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;
}
