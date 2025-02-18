import { Controller, Get } from '@nestjs/common';
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
}
