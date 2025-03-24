import { Module } from '@nestjs/common';
import { SubscriptionOrdersService } from './providers/subscription-orders.service';
import { SubscriptionOrdersController } from './controllers/subscription-orders.controller';

@Module({
  controllers: [SubscriptionOrdersController],
  providers: [SubscriptionOrdersService],
})
export class SubscriptionOrdersModule {}
