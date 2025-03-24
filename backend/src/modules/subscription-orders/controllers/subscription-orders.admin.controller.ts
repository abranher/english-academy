import { Controller, Get } from '@nestjs/common';

import { SubscriptionOrdersAdminService } from '../providers/subscription-orders.admin.service';

@Controller('admin/subscription-orders')
export class SubscriptionOrdersAdminController {
  constructor(
    private readonly subscriptionOrdersAdminService: SubscriptionOrdersAdminService,
  ) {}

  @Get()
  findAll() {
    return this.subscriptionOrdersAdminService.findAll();
  }
}
