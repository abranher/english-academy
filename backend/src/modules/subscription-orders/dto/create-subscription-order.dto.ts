import { IsNumber } from 'class-validator';

export class CreateSubscriptionOrderDto {
  @IsNumber()
  subscriptionPrice: number;

  @IsNumber()
  paymentReference: number;
}
