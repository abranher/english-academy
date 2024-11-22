import { Module } from '@nestjs/common';
import { PricesService } from './providers/prices.service';
import { PricesController } from './controllers/prices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
