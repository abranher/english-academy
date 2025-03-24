import { Controller } from '@nestjs/common';

import { SubscriptionOrderHistoryService } from '../providers/subscription-order-history.service';

@Controller('subscription-order-history')
export class SubscriptionOrderHistoryController {
  constructor(
    private readonly subscriptionOrderHistoryService: SubscriptionOrderHistoryService,
  ) {}
}
