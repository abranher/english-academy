import { Body, Controller, Param, Post } from '@nestjs/common';

import { MobilePaymentsService } from '../providers/mobile-payments.service';
import { CreateMobilePaymentDto } from '../dto/create-mobile-payment.dto';

@Controller('mobile-payments')
export class MobilePaymentsController {
  constructor(private readonly mobilePaymentsService: MobilePaymentsService) {}

  @Post('tutor/:tutorId')
  create(
    @Param('tutorId') tutorId: string,
    @Body() createMobilePaymentDto: CreateMobilePaymentDto,
  ) {
    return this.mobilePaymentsService.create(tutorId, createMobilePaymentDto);
  }
}
