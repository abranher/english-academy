import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from '../dto/update-purchase-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return 'This action adds a new purchaseOrder';
  }

  findAll() {
    return `This action returns all purchaseOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrder`;
  }

  update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return `This action updates a #${id} purchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrder`;
  }
}
