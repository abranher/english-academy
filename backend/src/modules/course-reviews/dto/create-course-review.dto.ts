import { CourseReviewDecision } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

const MIN = 30;
const MAX = 460;

export class CreateCourseReviewDto {
  @IsString()
  @Length(MIN, MAX, {
    message: `El feedback debe tener entre ${MIN} y ${MAX} caracteres.`,
  })
  feedback: string;

  @IsEnum(CourseReviewDecision, {
    message: 'Invalid decision value.',
  })
  @IsNotEmpty({ message: 'La decisión es requerida.' })
  decision: CourseReviewDecision;
}
