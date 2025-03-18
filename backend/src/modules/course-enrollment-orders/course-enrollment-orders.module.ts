import { Module } from '@nestjs/common';
import { CourseEnrollmentOrdersService } from './providers/course-enrollment-orders.service';
import { CourseEnrollmentOrdersController } from './controllers/course-enrollment-orders.controller';

@Module({
  controllers: [CourseEnrollmentOrdersController],
  providers: [CourseEnrollmentOrdersService],
})
export class CourseEnrollmentOrdersModule {}
