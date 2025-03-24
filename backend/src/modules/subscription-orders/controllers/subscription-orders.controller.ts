import { Body, Controller, Param, Post } from '@nestjs/common';

import { SubscriptionOrdersService } from '../providers/subscription-orders.service';
import { CreateSubscriptionOrderDto } from '../dto/create-subscription-order.dto';

@Controller('subscription-orders')
export class SubscriptionOrdersController {
  constructor(
    private readonly subscriptionOrdersService: SubscriptionOrdersService,
  ) {}

  @Post('tutor/:tutorId/plan/:planId')
  create(
    @Param('tutorId') tutorId: string,
    @Param('planId') planId: string,
    @Body() createSubscriptionOrderDto: CreateSubscriptionOrderDto,
  ) {
    return this.subscriptionOrdersService.create(
      tutorId,
      planId,
      createSubscriptionOrderDto,
    );
  }
}
