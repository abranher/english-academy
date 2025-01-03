import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasesService } from '../providers/purchases.service';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get('student/:studentId')
  findAll(@Param('studentId') studentId: string) {
    return this.purchasesService.findAll(studentId);
  }

  @Get('course/:courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.purchasesService.findOne(courseId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(+id);
  }
}
