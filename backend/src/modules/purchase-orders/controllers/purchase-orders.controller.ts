import { Controller, Post, Body, Param } from '@nestjs/common';

import { PurchaseOrdersService } from '../providers/purchase-orders.service';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';

@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post('student/:studentId')
  create(
    @Param('studentId') studentId: string,
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
  ) {
    return this.purchaseOrdersService.create(studentId, createPurchaseOrderDto);
  }
}
