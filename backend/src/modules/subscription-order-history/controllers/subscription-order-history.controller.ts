import { Body, Controller, Param, Post } from '@nestjs/common';

import { SubscriptionOrderHistoryService } from '../providers/subscription-order-history.service';
import { UpdateSubscriptionOrderDto } from 'src/modules/subscription-orders/dto/update-subscription-order.dto';

@Controller('subscription-order-history')
export class SubscriptionOrderHistoryController {
  constructor(
    private readonly subscriptionOrderHistoryService: SubscriptionOrderHistoryService,
  ) {}

  @Post(
    ':id/subscription-order/:subscriptionOrderId/tutor/:tutorId/resubmitted',
  )
  async create(
    @Param('id') id: string,
    @Param('subscriptionOrderId') subscriptionOrderId: string,
    @Param('tutorId') tutorId: string,
    @Body() updateSubscriptionOrderDto: UpdateSubscriptionOrderDto,
  ) {
    return this.subscriptionOrderHistoryService.resubmittedAt(
      id,
      subscriptionOrderId,
      tutorId,
      updateSubscriptionOrderDto,
    );
  }
}
