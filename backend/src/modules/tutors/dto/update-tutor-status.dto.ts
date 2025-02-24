import { IsString, Length, IsEnum, IsNotEmpty } from 'class-validator';
import { TutorStatus } from '@prisma/client';

export class UpdateTutorStatusDto {
  @IsString()
  @Length(10, 160, {
    message: 'Comment must be between 10 and 160 characters.',
  })
  comment: string;

  @IsEnum(TutorStatus, {
    message: 'Invalid status value.',
  })
  @IsNotEmpty({ message: 'Status is required.' })
  status: TutorStatus;
}
