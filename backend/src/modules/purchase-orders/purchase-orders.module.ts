import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './providers/purchase-orders.service';
import { PurchaseOrdersController } from './controllers/purchase-orders.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
