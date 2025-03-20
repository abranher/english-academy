import { Module } from '@nestjs/common';
import { BanksService } from './providers/banks.service';
import { BanksController } from './controllers/banks.controller';

@Module({
  controllers: [BanksController],
  providers: [BanksService],
})
export class BanksModule {}
