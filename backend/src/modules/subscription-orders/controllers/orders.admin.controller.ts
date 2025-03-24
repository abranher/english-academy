import { Controller, Get } from '@nestjs/common';

import { OrdersAdminService } from '../providers/orders.admin.service';

@Controller('admin/subscription-orders')
export class OrdersAdminController {
  constructor(private readonly ordersAdminService: OrdersAdminService) {}

  @Get()
  findAll() {
    return this.ordersAdminService.findAll();
  }
}
