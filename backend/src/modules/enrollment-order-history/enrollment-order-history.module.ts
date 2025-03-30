import { Module } from '@nestjs/common';
import { EnrollmentOrderHistoryService } from './providers/enrollment-order-history.service';
import { EnrollmentOrderHistoryController } from './controllers/enrollment-order-history.controller';

@Module({
  controllers: [EnrollmentOrderHistoryController],
  providers: [EnrollmentOrderHistoryService],
})
export class EnrollmentOrderHistoryModule {}
