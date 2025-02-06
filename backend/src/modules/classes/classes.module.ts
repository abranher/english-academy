import { Module } from '@nestjs/common';
import { ClassesService } from './providers/classes.service';
import { ClassesController } from './controllers/classes.controller';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
