import { Module } from '@nestjs/common';
import { SubscriptionsService } from './providers/subscriptions.service';
import { SubscriptionsController } from './controllers/subscriptions.controller';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
