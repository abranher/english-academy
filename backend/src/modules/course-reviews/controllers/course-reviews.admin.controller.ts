import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CourseReviewsAdminService } from '../providers/course-reviews.admin.service';
import { CreateCourseReviewDto } from '../dto/create-course-review.dto';

@Controller('admin/course-reviews')
export class CourseReviewsAdminController {
  constructor(
    private readonly courseReviewsAdminService: CourseReviewsAdminService,
  ) {}

  @Post()
  create(@Body() createCourseReviewDto: CreateCourseReviewDto) {
    return this.courseReviewsAdminService.create(createCourseReviewDto);
  }

  @Get('course/:courseId/admin')
  findAllForAdmin(@Param('courseId') courseId: string) {
    return this.courseReviewsAdminService.findAllForAdmin(courseId);
  }
}
