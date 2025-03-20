import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MobilePaymentsService } from '../providers/mobile-payments.service';
import { CreateMobilePaymentDto } from '../dto/create-mobile-payment.dto';
import { UpdateMobilePaymentDto } from '../dto/update-mobile-payment.dto';

@Controller('mobile-payments')
export class MobilePaymentsController {
  constructor(private readonly mobilePaymentsService: MobilePaymentsService) {}

  @Post()
  create(@Body() createMobilePaymentDto: CreateMobilePaymentDto) {
    return this.mobilePaymentsService.create(createMobilePaymentDto);
  }

  @Get()
  findAll() {
    return this.mobilePaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobilePaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMobilePaymentDto: UpdateMobilePaymentDto) {
    return this.mobilePaymentsService.update(+id, updateMobilePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobilePaymentsService.remove(+id);
  }
}
