import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionOrderDto } from './create-subscription-order.dto';

export class UpdateSubscriptionOrderDto extends PartialType(CreateSubscriptionOrderDto) {}
