import { Controller } from '@nestjs/common';

import { EnrollmentOrdersService } from '../providers/enrollment-orders.service';

@Controller('enrollment-orders')
export class EnrollmentOrdersController {
  constructor(
    private readonly enrollmentOrdersService: EnrollmentOrdersService,
  ) {}
}
