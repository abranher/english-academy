import { PartialType } from '@nestjs/mapped-types';
import { CreateMobilePaymentDto } from './create-mobile-payment.dto';

export class UpdateMobilePaymentDto extends PartialType(CreateMobilePaymentDto) {}
