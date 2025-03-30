import { Module } from '@nestjs/common';

import { EnrollmentOrdersController } from './controllers/enrollment-orders.controller';
import { TutorOrdersController } from './controllers/tutor.orders.controller';
import { EnrollmentOrdersService } from './providers/enrollment-orders.service';
import { TutorOrdersService } from './providers/tutor.orders.service';

@Module({
  controllers: [EnrollmentOrdersController, TutorOrdersController],
  providers: [EnrollmentOrdersService, TutorOrdersService],
})
export class EnrollmentOrdersModule {}
