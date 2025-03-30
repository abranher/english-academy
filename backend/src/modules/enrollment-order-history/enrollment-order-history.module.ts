import { Module } from '@nestjs/common';
import { EnrollmentOrderHistoryService } from './enrollment-order-history.service';
import { EnrollmentOrderHistoryController } from './enrollment-order-history.controller';

@Module({
  controllers: [EnrollmentOrderHistoryController],
  providers: [EnrollmentOrderHistoryService],
})
export class EnrollmentOrderHistoryModule {}
