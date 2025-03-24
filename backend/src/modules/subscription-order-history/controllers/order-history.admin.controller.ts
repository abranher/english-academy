import { Body, Controller, Param, Post } from '@nestjs/common';

import { OrderHistoryAdminService } from '../providers/order-history.admin.service';
import { CreateSubscriptionOrderHistoryDto } from '../dto/create-subscription-order-history.dto';

@Controller('admin/subscription-order-history')
export class OrderHistoryAdminController {
  constructor(
    private readonly orderHistoryAdminService: OrderHistoryAdminService,
  ) {}

  @Post('subscription-order/:subscriptionOrderId')
  async create(
    @Param('subscriptionOrderId') subscriptionOrderId: string,
    @Body()
    createSubscriptionOrderHistoryDto: CreateSubscriptionOrderHistoryDto,
  ) {
    return this.orderHistoryAdminService.create(
      subscriptionOrderId,
      createSubscriptionOrderHistoryDto,
    );
  }
}
