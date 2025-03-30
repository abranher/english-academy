import { EnrollmentOrderStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEnrollmentOrderHistoryDto {
  @IsString()
  @Length(30, 160, {
    message: 'Comment must be between 30 and 160 characters.',
  })
  comment: string;

  @IsEnum(EnrollmentOrderStatus, {
    message: 'Invalid status value.',
  })
  @IsNotEmpty({ message: 'Status is required.' })
  status: EnrollmentOrderStatus;
}
