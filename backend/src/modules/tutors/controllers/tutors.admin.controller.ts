import { Controller, Get, Param } from '@nestjs/common';
import { TutorsAdminService } from '../providers/tutors.admin.service';

@Controller('admin/tutors')
export class TutorsAdminController {
  constructor(private readonly tutorsAdminService: TutorsAdminService) {}

  @Get()
  async findAll() {
    return this.tutorsAdminService.findAll();
  }

  @Get('pending')
  async findPending() {
    return this.tutorsAdminService.findPending();
  }

  @Get('approved')
  async findApproved() {
    return this.tutorsAdminService.findApproved();
  }

  @Get('rejected')
  async findRejected() {
    return this.tutorsAdminService.findRejected();
  }

  // Get tutor for description in dashboard
  @Get('user/:userId')
  async findUserTutor(@Param('userId') userId: string) {
    return this.tutorsAdminService.findUserTutor(userId);
  }
}
