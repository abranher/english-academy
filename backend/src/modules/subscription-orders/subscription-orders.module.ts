import { Module } from '@nestjs/common';

import { OrdersAdminController } from './controllers/orders.admin.controller';
import { SubscriptionOrdersController } from './controllers/subscription-orders.controller';
import { SubscriptionOrdersService } from './providers/subscription-orders.service';
import { OrdersAdminService } from './providers/orders.admin.service';

@Module({
  controllers: [OrdersAdminController, SubscriptionOrdersController],
  providers: [SubscriptionOrdersService, OrdersAdminService],
})
export class SubscriptionOrdersModule {}
