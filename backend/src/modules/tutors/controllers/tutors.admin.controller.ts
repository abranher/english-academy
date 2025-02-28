import { Controller, Get, Param } from '@nestjs/common';

import { TutorStatus } from '@prisma/client';

import { TutorsAdminService } from '../providers/tutors.admin.service';

@Controller('admin/tutors')
export class TutorsAdminController {
  constructor(private readonly tutorsAdminService: TutorsAdminService) {}

  @Get()
  async findAll() {
    return this.tutorsAdminService.findAll();
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: TutorStatus) {
    return this.tutorsAdminService.findByStatus(status);
  }

  // Get tutor for description in dashboard
  @Get('user/:userId')
  async findUserTutor(@Param('userId') userId: string) {
    return this.tutorsAdminService.findUserTutor(userId);
  }
}
