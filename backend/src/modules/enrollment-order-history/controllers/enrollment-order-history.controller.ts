import { Controller } from '@nestjs/common';

import { EnrollmentOrderHistoryService } from '../providers/enrollment-order-history.service';

@Controller('enrollment-order-history')
export class EnrollmentOrderHistoryController {
  constructor(
    private readonly enrollmentOrderHistoryService: EnrollmentOrderHistoryService,
  ) {}
}
