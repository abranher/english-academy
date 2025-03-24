import { Controller, Get, Param } from '@nestjs/common';

import { OrdersAdminService } from '../providers/orders.admin.service';
import { SubscriptionOrderStatus } from '@prisma/client';

@Controller('admin/subscription-orders')
export class OrdersAdminController {
  constructor(private readonly ordersAdminService: OrdersAdminService) {}

  @Get()
  findAll() {
    return this.ordersAdminService.findAll();
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: SubscriptionOrderStatus) {
    return this.ordersAdminService.findByStatus(status);
  }
}
