import { Module } from '@nestjs/common';
import { MobilePaymentsService } from './providers/mobile-payments.service';
import { MobilePaymentsController } from './controllers/mobile-payments.controller';

@Module({
  controllers: [MobilePaymentsController],
  providers: [MobilePaymentsService],
})
export class MobilePaymentsModule {}
