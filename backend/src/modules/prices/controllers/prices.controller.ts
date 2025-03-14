import { Controller, Get } from '@nestjs/common';

import { PricesService } from '../providers/prices.service';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  findAll() {
    return this.pricesService.findAll();
  }
}
