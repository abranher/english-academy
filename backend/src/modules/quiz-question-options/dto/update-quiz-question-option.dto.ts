import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizQuestionOptionDto } from './create-quiz-question-option.dto';

export class UpdateQuizQuestionOptionDto extends PartialType(CreateQuizQuestionOptionDto) {}
