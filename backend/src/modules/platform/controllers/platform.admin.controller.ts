import { Controller, Get, Param } from '@nestjs/common';

import { PlatformAdminService } from '../providers/platform.admin.service';

@Controller('admin/platform')
export class PlatformAdminController {
  constructor(private readonly platformAdminService: PlatformAdminService) {}

  @Get('user/:userId/payment-method')
  findOne(@Param('userId') userId: string) {
    return this.platformAdminService.findOne(userId);
  }
}
