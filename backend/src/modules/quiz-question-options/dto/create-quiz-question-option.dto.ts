import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizQuestionOptionDto {
  @IsNotEmpty()
  @IsString()
  option: string;
}
