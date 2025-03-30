import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentOrderHistoryService } from './enrollment-order-history.service';
import { CreateEnrollmentOrderHistoryDto } from './dto/create-enrollment-order-history.dto';
import { UpdateEnrollmentOrderHistoryDto } from './dto/update-enrollment-order-history.dto';

@Controller('enrollment-order-history')
export class EnrollmentOrderHistoryController {
  constructor(private readonly enrollmentOrderHistoryService: EnrollmentOrderHistoryService) {}

  @Post()
  create(@Body() createEnrollmentOrderHistoryDto: CreateEnrollmentOrderHistoryDto) {
    return this.enrollmentOrderHistoryService.create(createEnrollmentOrderHistoryDto);
  }

  @Get()
  findAll() {
    return this.enrollmentOrderHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentOrderHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollmentOrderHistoryDto: UpdateEnrollmentOrderHistoryDto) {
    return this.enrollmentOrderHistoryService.update(+id, updateEnrollmentOrderHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentOrderHistoryService.remove(+id);
  }
}
