import { Controller, Get, Param } from '@nestjs/common';

import { PlatformService } from '../providers/platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('admin/:userId/payment-method')
  findOne(@Param('userId') userId: string) {
    return this.platformService.findOne(userId);
  }
}
