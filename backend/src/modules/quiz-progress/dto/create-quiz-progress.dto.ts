import { IsNumber } from 'class-validator';

export class CreateQuizProgressDto {
  @IsNumber()
  earnedPoints: number;
}
