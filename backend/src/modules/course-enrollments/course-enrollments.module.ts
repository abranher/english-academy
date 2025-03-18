import { Module } from '@nestjs/common';
import { CourseEnrollmentsService } from './providers/course-enrollments.service';
import { CourseEnrollmentsController } from './controllers/course-enrollments.controller';

@Module({
  controllers: [CourseEnrollmentsController],
  providers: [CourseEnrollmentsService],
})
export class CourseEnrollmentsModule {}
