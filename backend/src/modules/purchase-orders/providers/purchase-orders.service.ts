import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from '../dto/update-purchase-order.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class PurchaseOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    studentId: string,
    createPurchaseOrderDto: CreatePurchaseOrderDto,
  ) {
    const { courses } = createPurchaseOrderDto;

    const purchaseOrder = await this.prisma.purchaseOrder.create({
      data: {
        total: createPurchaseOrderDto.total,
        payment_reference: parseInt(createPurchaseOrderDto.payment_reference),
        studentId,
      },
    });

    for (const { courseId } of courses) {
      await this.prisma.purchase.create({
        data: {
          studentId,
          purchaseOrderId: purchaseOrder.id,
          courseId,
        },
      });
    }

    return {
      message: 'Pago procesado correctamente',
    };
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
