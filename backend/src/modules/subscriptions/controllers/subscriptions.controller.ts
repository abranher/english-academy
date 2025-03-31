import { Controller, Get, Param } from '@nestjs/common';

import { SubscriptionsService } from '../providers/subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  /*
   * Get subscription for tutor
   */
  @Get('tutor/:tutorId')
  findOne(@Param('tutorId') tutorId: string) {
    return this.subscriptionsService.findOne(tutorId);
  }
}
