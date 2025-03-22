import { Body, Controller, Param, Patch } from '@nestjs/common';

import { MobilePaymentsAdminService } from '../providers/mobile-payments.admin.service';
import { UpdateMobilePaymentDto } from '../dto/update-mobile-payment.dto';

@Controller('admin/mobile-payments')
export class MobilePaymentsAdminController {
  constructor(
    private readonly mobilePaymentsAdminService: MobilePaymentsAdminService,
  ) {}

  /*
   * Update Mobile payment for platform
   */
  @Patch('user/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateMobilePaymentDto: UpdateMobilePaymentDto,
  ) {
    return this.mobilePaymentsAdminService.update(
      userId,
      updateMobilePaymentDto,
    );
  }
}
