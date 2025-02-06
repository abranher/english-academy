import { Module } from '@nestjs/common';

import { ClassesService } from './providers/classes.service';
import { ClassesController } from './controllers/classes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
