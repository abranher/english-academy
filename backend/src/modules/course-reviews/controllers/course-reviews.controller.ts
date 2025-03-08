import { Controller, Get, Post, Param } from '@nestjs/common';
import { CourseReviewsService } from '../providers/course-reviews.service';

@Controller('course-reviews')
export class CourseReviewsController {
  constructor(private readonly courseReviewsService: CourseReviewsService) {}

  @Post('course/:courseId')
  create(@Param('courseId') courseId: string) {
    return this.courseReviewsService.create(courseId);
  }

  @Get('course/:courseId')
  findAll(@Param('courseId') courseId: string) {
    return this.courseReviewsService.findAll(courseId);
  }
}
