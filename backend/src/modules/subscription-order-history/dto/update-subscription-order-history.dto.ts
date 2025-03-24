import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionOrderHistoryDto } from './create-subscription-order-history.dto';

export class UpdateSubscriptionOrderHistoryDto extends PartialType(CreateSubscriptionOrderHistoryDto) {}
