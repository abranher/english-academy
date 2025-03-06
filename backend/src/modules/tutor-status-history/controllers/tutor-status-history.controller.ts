import { Controller, Param, Post } from '@nestjs/common';

import { TutorStatusHistoryService } from '../providers/tutor-status-history.service';

@Controller('tutor-status-history')
export class TutorStatusHistoryController {
  constructor(
    private readonly tutorStatusHistoryService: TutorStatusHistoryService,
  ) {}

  @Post(':id/user/:userId/resubmitted')
  async create(@Param('id') id: string, @Param('userId') userId: string) {
    return this.tutorStatusHistoryService.resubmittedAt(id, userId);
  }
}
