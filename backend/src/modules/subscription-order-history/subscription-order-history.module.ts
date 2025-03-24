import { Module } from '@nestjs/common';

import { OrderHistoryAdminController } from './controllers/order-history.admin.controller';
import { SubscriptionOrderHistoryController } from './controllers/subscription-order-history.controller';
import { OrderHistoryAdminService } from './providers/order-history.admin.service';
import { SubscriptionOrderHistoryService } from './providers/subscription-order-history.service';

@Module({
  controllers: [
    OrderHistoryAdminController,
    SubscriptionOrderHistoryController,
  ],
  providers: [OrderHistoryAdminService, SubscriptionOrderHistoryService],
})
export class SubscriptionOrderHistoryModule {}
