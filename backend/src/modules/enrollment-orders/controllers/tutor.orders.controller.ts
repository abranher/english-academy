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
  findAll(@Param('tutorId') tutorId: string) {
    return this.tutorOrdersService.findAll(tutorId);
  }

  /*
   * Get one enrollment order
   */
  @Get(':id/tutor/:tutorId')
  findOne(@Param('id') id: string, @Param('tutorId') tutorId: string) {
    return this.tutorOrdersService.findOne(id, tutorId);
  }

  /*
   * Get enrollment orders by status
   */
  @Get('status/:status/tutor/:tutorId')
  findAllByStatus(
    @Param('status') status: EnrollmentOrderStatus,
    @Param('tutorId') tutorId: string,
  ) {
    return this.tutorOrdersService.findAllByStatus(status, tutorId);
  }
}
