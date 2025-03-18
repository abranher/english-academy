import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';
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
}
