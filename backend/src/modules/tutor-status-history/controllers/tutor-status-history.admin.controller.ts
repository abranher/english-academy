import { Body, Controller, Param, Post } from '@nestjs/common';

import { TutorStatusHistoryAdminService } from '../providers/tutor-status-history.admin.service';
import { CreateTutorStatusHistoryDto } from '../dto/create-tutor-status-history.dto';

@Controller('admin/tutor-status-history')
export class TutorStatusHistoryAdminController {
  constructor(
    private readonly tutorStatusHistoryAdminService: TutorStatusHistoryAdminService,
  ) {}

  @Post('user/:userId')
  async create(
    @Param('userId') userId: string,
    @Body() createTutorStatusHistoryDto: CreateTutorStatusHistoryDto,
  ) {
    return this.tutorStatusHistoryAdminService.create(
      userId,
      createTutorStatusHistoryDto,
    );
  }
}
