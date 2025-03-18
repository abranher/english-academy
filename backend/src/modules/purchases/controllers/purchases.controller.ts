import { Controller, Get, Param } from '@nestjs/common';
import { PurchasesService } from '../providers/purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get('student/:studentId')
  findAll(@Param('studentId') studentId: string) {
    return this.purchasesService.findAll(studentId);
  }

  @Get('course/:courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.purchasesService.findOne(courseId);
  }
}
