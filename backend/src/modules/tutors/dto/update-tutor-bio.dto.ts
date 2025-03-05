import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import messages from 'src/libs/validations/messages';

const MAX = 450;
const MIN = 17;

export class UpdateTutorBioDto {
  @IsOptional()
  @IsString()
  @MinLength(MIN, messages.min)
  @MaxLength(MAX, messages.max)
  bio: string;
}
