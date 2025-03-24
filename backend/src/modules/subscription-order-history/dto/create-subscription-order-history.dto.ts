import { SubscriptionOrderStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSubscriptionOrderHistoryDto {
  @IsString()
  @Length(30, 160, {
    message: 'Comment must be between 30 and 160 characters.',
  })
  comment: string;

  @IsEnum(SubscriptionOrderStatus, {
    message: 'Invalid status value.',
  })
  @IsNotEmpty({ message: 'Status is required.' })
  status: SubscriptionOrderStatus;
}
