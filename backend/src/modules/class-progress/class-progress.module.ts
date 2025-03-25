import { Module } from '@nestjs/common';
import { ClassProgressService } from './providers/class-progress.service';
import { ClassProgressController } from './controllers/class-progress.controller';

@Module({
  controllers: [ClassProgressController],
  providers: [ClassProgressService],
})
export class ClassProgressModule {}
