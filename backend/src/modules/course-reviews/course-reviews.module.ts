import { Module } from '@nestjs/common';
import { CourseReviewsService } from './providers/course-reviews.service';
import { CourseReviewsController } from './controllers/course-reviews.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseReviewsController],
  providers: [CourseReviewsService],
})
export class CourseReviewsModule {}
