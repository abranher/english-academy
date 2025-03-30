import { Controller, Get, Param } from '@nestjs/common';

import { EnrollmentOrderStatus } from '@prisma/client';

import { TutorOrdersService } from '../providers/tutor.orders.service';

@Controller('enrollment-orders')
export class TutorOrdersController {
  constructor(private readonly tutorOrdersService: TutorOrdersService) {}

  /*
   * Get enrollment orders
   */
  @Get('tutor/:tutorId')
  findAllForTutor(@Param('tutorId') tutorId: string) {
    return this.tutorOrdersService.findAllForTutor(tutorId);
  }

  /*
   * Get enrollment orders by status
   */
  @Get('status/:status/tutor/:tutorId')
  findAllForTutorByStatus(
    @Param('status') status: EnrollmentOrderStatus,
    @Param('tutorId') tutorId: string,
  ) {
    return this.tutorOrdersService.findAllForTutorByStatus(status, tutorId);
  }
}
