import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuizQuestionOptionDto {
  @IsNotEmpty()
  @IsString()
  option: string;

  // For correct option
  @IsOptional()
  @IsString()
  optionId: string;
}
