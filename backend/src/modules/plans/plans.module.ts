import { Module } from '@nestjs/common';
import { PlansService } from './providers/plans.service';
import { PlansController } from './controllers/plans.controller';

@Module({
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
