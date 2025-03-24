import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { SubscriptionOrderStatus } from '@prisma/client';

import { SubscriptionOrdersService } from '../providers/subscription-orders.service';
import { CreateSubscriptionOrderDto } from '../dto/create-subscription-order.dto';

@Controller('subscription-orders')
export class SubscriptionOrdersController {
  constructor(
    private readonly subscriptionOrdersService: SubscriptionOrdersService,
  ) {}

  /*
   * Get all subscription orders
   */
  @Get('tutor/:tutorId')
  findAll(@Param('tutorId') tutorId: string) {
    return this.subscriptionOrdersService.findAll(tutorId);
  }

  /*
   * Get one subscription order
   */
  @Get(':id/tutor/:tutorId')
  findOne(@Param('id') id: string, @Param('tutorId') tutorId: string) {
    return this.subscriptionOrdersService.findOne(id, tutorId);
  }

  /*
   * Get all subscription orders by status
   */
  @Get('status/:status/tutor/:tutorId')
  findByStatus(
    @Param('status') status: SubscriptionOrderStatus,
    @Param('tutorId') tutorId: string,
  ) {
    return this.subscriptionOrdersService.findByStatus(status, tutorId);
  }

  /*
   * Create Subscription Order
   */
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
