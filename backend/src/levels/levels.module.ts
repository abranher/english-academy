import { Module } from '@nestjs/common';
import { LevelsService } from './providers/levels.service';
import { LevelsController } from './controllers/levels.controller';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
