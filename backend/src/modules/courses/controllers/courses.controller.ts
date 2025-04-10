import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Put,
} from '@nestjs/common';

import { CoursesService } from '../providers/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  /**
   * Create Course
   */
  @Post('tutor/:tutorId')
  create(
    @Headers('X-User-Id-Audit-Log') userHeader: string,
    @Param('tutorId') tutorId: string,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.coursesService.create(tutorId, createCourseDto, userHeader);
  }

  /**
   * Get Course
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  /**
   * Update every field
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  /**
   * Publish a course
   */
  @Put(':id/tutor/:tutorId/publish')
  publish(
    @Headers('X-User-Id-Audit-Log') userHeader: string,
    @Param('id') id: string,
    @Param('tutorId') tutorId: string,
  ) {
    return this.coursesService.publishCourse(id, tutorId, userHeader);
  }

  /**
   * Archive a course
   */
  @Put(':id/tutor/:tutorId/archive')
  archive(
    @Headers('X-User-Id-Audit-Log') userHeader: string,
    @Param('id') id: string,
    @Param('tutorId') tutorId: string,
  ) {
    return this.coursesService.archiveCourse(id, tutorId, userHeader);
  }
}
