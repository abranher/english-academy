import { IsNumber } from 'class-validator';

export class CreateEnrollmentOrderDto {
  @IsNumber()
  enrollmentPrice: number;

  @IsNumber()
  paymentReference: number;
}
