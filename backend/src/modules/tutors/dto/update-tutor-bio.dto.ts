import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import messages from 'src/libs/validations/messages';

export class UpdateTutorBioDto {
  @IsOptional()
  @IsString()
  @MinLength(10, messages.min)
  @MaxLength(100, messages.max)
  bio: string;
}
