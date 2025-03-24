import { Controller, Get, Param } from '@nestjs/common';

import { OrdersAdminService } from '../providers/orders.admin.service';
import { SubscriptionOrderStatus } from '@prisma/client';

@Controller('admin/subscription-orders')
export class OrdersAdminController {
  constructor(private readonly ordersAdminService: OrdersAdminService) {}

  /*
   * Get all subscription orders for admin
   */
  @Get()
  findAll() {
    return this.ordersAdminService.findAll();
  }

  /*
   * Get one subscription order for admin
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersAdminService.findOne(id);
  }

  /*
   * Get all subscription orders by status for admin
   */
  @Get('status/:status')
  findByStatus(@Param('status') status: SubscriptionOrderStatus) {
    return this.ordersAdminService.findByStatus(status);
  }
}
