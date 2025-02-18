import { Controller, Get } from '@nestjs/common';
import { TutorsAdminService } from '../providers/tutors.admin.service';

@Controller('admin/tutors')
export class TutorsAdminController {
  constructor(private readonly tutorsAdminService: TutorsAdminService) {}

  @Get()
  async findAll() {
    return this.tutorsAdminService.findAll();
  }
}
