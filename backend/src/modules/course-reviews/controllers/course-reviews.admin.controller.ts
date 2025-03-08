import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { CourseReviewsAdminService } from '../providers/course-reviews.admin.service';
import { UpdateCourseReviewDto } from '../dto/update-course-review.dto';

@Controller('admin/course-reviews')
export class CourseReviewsAdminController {
  constructor(
    private readonly courseReviewsAdminService: CourseReviewsAdminService,
  ) {}

  @Get('course/:courseId')
  findAll(@Param('courseId') courseId: string) {
    return this.courseReviewsAdminService.findAll(courseId);
  }

  @Patch(':courseReviewId/user/:userId')
  update(
    @Param('courseReviewId') courseReviewId: string,
    @Param('userId') userId: string,
    @Body() updateCourseReviewDto: UpdateCourseReviewDto,
  ) {
    return this.courseReviewsAdminService.update(
      courseReviewId,
      userId,
      updateCourseReviewDto,
    );
  }
}
