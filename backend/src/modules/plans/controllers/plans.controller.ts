import { Controller, Get, Param } from '@nestjs/common';

import { PlansService } from '../providers/plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  /*
   * Get Plans
   */
  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  /*
   * Get Plan one
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }
}
