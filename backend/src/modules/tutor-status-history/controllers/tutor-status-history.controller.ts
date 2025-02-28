import { Controller } from '@nestjs/common';

import { TutorStatusHistoryService } from '../providers/tutor-status-history.service';

@Controller('tutor-status-history')
export class TutorStatusHistoryController {
  constructor(
    private readonly tutorStatusHistoryService: TutorStatusHistoryService,
  ) {}
}
