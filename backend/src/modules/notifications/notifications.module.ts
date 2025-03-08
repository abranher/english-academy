import { Global, Module } from '@nestjs/common';

import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './providers/notifications.service';
import { UpdatedTutorStatus } from './class/updated-tutor-status';
import { UpdatedCourseReview } from './class/updated-course-review';

@Global()
@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, UpdatedTutorStatus, UpdatedCourseReview],
  exports: [NotificationsService, UpdatedTutorStatus, UpdatedCourseReview],
})
export class NotificationsModule {}
