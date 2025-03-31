import { Body, Controller, Param, Post } from '@nestjs/common';

import { EnrollmentOrderHistoryService } from '../providers/enrollment-order-history.service';
import { UpdateEnrollmentOrderDto } from 'src/modules/enrollment-orders/dto/update-enrollment-order.dto';

@Controller('enrollment-order-history')
export class EnrollmentOrderHistoryController {
  constructor(
    private readonly enrollmentOrderHistoryService: EnrollmentOrderHistoryService,
  ) {}

  @Post(
    ':id/enrollment-order/:enrollmentOrderId/student/:studentId/resubmitted',
  )
  async create(
    @Param('id') id: string,
    @Param('enrollmentOrderId') enrollmentOrderId: string,
    @Param('studentId') studentId: string,
    @Body() updateEnrollmentOrderDto: UpdateEnrollmentOrderDto,
  ) {
    return this.enrollmentOrderHistoryService.resubmittedAt(
      id,
      enrollmentOrderId,
      studentId,
      updateEnrollmentOrderDto,
    );
  }
}
