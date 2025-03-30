import { Injectable } from '@nestjs/common';
import { CreateEnrollmentOrderHistoryDto } from './dto/create-enrollment-order-history.dto';
import { UpdateEnrollmentOrderHistoryDto } from './dto/update-enrollment-order-history.dto';

@Injectable()
export class EnrollmentOrderHistoryService {
  create(createEnrollmentOrderHistoryDto: CreateEnrollmentOrderHistoryDto) {
    return 'This action adds a new enrollmentOrderHistory';
  }

  findAll() {
    return `This action returns all enrollmentOrderHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollmentOrderHistory`;
  }

  update(id: number, updateEnrollmentOrderHistoryDto: UpdateEnrollmentOrderHistoryDto) {
    return `This action updates a #${id} enrollmentOrderHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollmentOrderHistory`;
  }
}
