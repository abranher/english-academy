import { Controller } from '@nestjs/common';

import { TutorOrderHistoryService } from '../providers/tutor.order-history.service';

@Controller('enrollment-order-history')
export class TutorOrderHistoryController {
  constructor(
    private readonly tutorOrderHistoryService: TutorOrderHistoryService,
  ) {}
}
