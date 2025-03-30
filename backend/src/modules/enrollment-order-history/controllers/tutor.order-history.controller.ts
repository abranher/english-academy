import { Body, Controller, Param, Post } from '@nestjs/common';

import { TutorOrderHistoryService } from '../providers/tutor.order-history.service';
import { CreateEnrollmentOrderHistoryDto } from '../dto/create-enrollment-order-history.dto';

@Controller('enrollment-order-history')
export class TutorOrderHistoryController {
  constructor(
    private readonly tutorOrderHistoryService: TutorOrderHistoryService,
  ) {}

  @Post('tutor/:tutorId/enrollment-order/:enrollmentOrderId')
  async create(
    @Param('tutorId') tutorId: string,
    @Param('enrollmentOrderId') enrollmentOrderId: string,
    @Body() createEnrollmentOrderHistoryDto: CreateEnrollmentOrderHistoryDto,
  ) {
    return this.tutorOrderHistoryService.create(
      tutorId,
      enrollmentOrderId,
      createEnrollmentOrderHistoryDto,
    );
  }
}
