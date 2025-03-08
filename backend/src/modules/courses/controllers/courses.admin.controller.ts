import { Controller, Get, Param } from '@nestjs/common';

import { CourseReviewStatus } from '@prisma/client';

import { CoursesAdminService } from '../providers/courses.admin.service';

@Controller('admin/courses/list')
export class CoursesAdminController {
  constructor(private readonly coursesAdminService: CoursesAdminService) {}

  @Get()
  async findAll() {
    return this.coursesAdminService.findAll();
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: CourseReviewStatus) {
    return this.coursesAdminService.findByStatus(status);
  }
}
