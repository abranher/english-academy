import { Injectable } from '@nestjs/common';
import { CreateMobilePaymentDto } from '../dto/create-mobile-payment.dto';
import { UpdateMobilePaymentDto } from '../dto/update-mobile-payment.dto';

@Injectable()
export class MobilePaymentsService {
  create(createMobilePaymentDto: CreateMobilePaymentDto) {
    return 'This action adds a new mobilePayment';
  }

  findAll() {
    return `This action returns all mobilePayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobilePayment`;
  }

  update(id: number, updateMobilePaymentDto: UpdateMobilePaymentDto) {
    return `This action updates a #${id} mobilePayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobilePayment`;
  }
}
