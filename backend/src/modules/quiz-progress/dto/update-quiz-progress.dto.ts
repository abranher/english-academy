import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizProgressDto } from './create-quiz-progress.dto';

export class UpdateQuizProgressDto extends PartialType(CreateQuizProgressDto) {}
