import { Module } from '@nestjs/common';
import { LessonsService } from './providers/lessons.service';
import { LessonsController } from './controllers/lessons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LessonsFilesController } from './controllers/lessons.files.controller';
import { LessonsFilesService } from './providers/lessons.files.service';

@Module({
  imports: [PrismaModule],
  controllers: [LessonsController, LessonsFilesController],
  providers: [LessonsService, LessonsFilesService],
})
export class LessonsModule {}
