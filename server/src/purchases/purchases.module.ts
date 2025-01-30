import { Module } from '@nestjs/common';
import { PurchasesService } from './providers/purchases.service';
import { PurchasesController } from './controllers/purchases.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
