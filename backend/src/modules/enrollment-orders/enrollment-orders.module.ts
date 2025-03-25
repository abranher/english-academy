import { Module } from '@nestjs/common';
import { EnrollmentOrdersService } from './providers/enrollment-orders.service';
import { EnrollmentOrdersController } from './controllers/enrollment-orders.controller';

@Module({
  controllers: [EnrollmentOrdersController],
  providers: [EnrollmentOrdersService],
})
export class EnrollmentOrdersModule {}
