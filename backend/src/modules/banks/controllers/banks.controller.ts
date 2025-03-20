import { Controller, Get } from '@nestjs/common';

import { BanksService } from '../providers/banks.service';

@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get()
  findAll() {
    return this.banksService.findAll();
  }
}
