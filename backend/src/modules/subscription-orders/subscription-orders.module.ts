import { Module } from '@nestjs/common';

import { SubscriptionOrdersAdminController } from './controllers/subscription-orders.admin.controller';
import { SubscriptionOrdersController } from './controllers/subscription-orders.controller';
import { SubscriptionOrdersService } from './providers/subscription-orders.service';
import { SubscriptionOrdersAdminService } from './providers/subscription-orders.admin.service';

@Module({
  controllers: [
    SubscriptionOrdersController,
    SubscriptionOrdersAdminController,
  ],
  providers: [SubscriptionOrdersService, SubscriptionOrdersAdminService],
})
export class SubscriptionOrdersModule {}
