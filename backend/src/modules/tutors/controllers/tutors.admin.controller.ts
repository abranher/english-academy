import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TutorStatus } from '@prisma/client';

import { TutorsAdminService } from '../providers/tutors.admin.service';
import { UpdateTutorStatusDto } from '../dto/update-tutor-status.dto';

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

  @Post('user/:userId/manage-status')
  async manageTutorStatus(
    @Param('userId') userId: string,
    @Body() updateTutorStatusDto: UpdateTutorStatusDto,
  ) {
    return this.tutorsAdminService.manageTutorStatus(
      userId,
      updateTutorStatusDto,
    );
  }
}
