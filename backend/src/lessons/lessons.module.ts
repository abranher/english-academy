import { Module } from '@nestjs/common';
import { LessonsService } from './providers/lessons.service';
import { LessonsController } from './controllers/lessons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
