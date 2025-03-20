import { Controller } from '@nestjs/common';

import { MobilePaymentsService } from '../providers/mobile-payments.service';

@Controller('mobile-payments')
export class MobilePaymentsController {
  constructor(private readonly mobilePaymentsService: MobilePaymentsService) {}
}
