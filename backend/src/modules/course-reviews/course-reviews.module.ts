import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { CourseReviewsController } from './controllers/course-reviews.controller';
import { CourseReviewsAdminController } from './controllers/course-reviews.admin.controller';
import { CourseReviewsService } from './providers/course-reviews.service';
import { CourseReviewsAdminService } from './providers/course-reviews.admin.service';

@Module({
  imports: [PrismaModule],
  controllers: [CourseReviewsController, CourseReviewsAdminController],
  providers: [CourseReviewsService, CourseReviewsAdminService],
})
export class CourseReviewsModule {}
