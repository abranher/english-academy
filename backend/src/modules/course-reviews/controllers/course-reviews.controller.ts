import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseReviewsService } from '../providers/course-reviews.service';
import { CreateCourseReviewDto } from '../dto/create-course-review.dto';
import { UpdateCourseReviewDto } from '../dto/update-course-review.dto';

@Controller('course-reviews')
export class CourseReviewsController {
  constructor(private readonly courseReviewsService: CourseReviewsService) {}

  @Post()
  create(@Body() createCourseReviewDto: CreateCourseReviewDto) {
    return this.courseReviewsService.create(createCourseReviewDto);
  }

  @Get('course/:courseId')
  findAll(@Param('courseId') courseId: string) {
    return this.courseReviewsService.findAll(courseId);
  }

  @Get('course/:courseId/admin')
  findAllForAdmin(@Param('courseId') courseId: string) {
    return this.courseReviewsService.findAllForAdmin(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseReviewDto: UpdateCourseReviewDto,
  ) {
    return this.courseReviewsService.update(+id, updateCourseReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseReviewsService.remove(+id);
  }
}
