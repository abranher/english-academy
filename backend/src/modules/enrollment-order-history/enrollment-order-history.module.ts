import { Module } from '@nestjs/common';

import { EnrollmentOrderHistoryController } from './controllers/enrollment-order-history.controller';
import { TutorOrderHistoryController } from './controllers/tutor.order-history.controller';
import { EnrollmentOrderHistoryService } from './providers/enrollment-order-history.service';
import { TutorOrderHistoryService } from './providers/tutor.order-history.service';

@Module({
  controllers: [EnrollmentOrderHistoryController, TutorOrderHistoryController],
  providers: [EnrollmentOrderHistoryService, TutorOrderHistoryService],
})
export class EnrollmentOrderHistoryModule {}
