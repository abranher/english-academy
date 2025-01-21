import { Module } from '@nestjs/common';
import { CoursesService } from './providers/courses.service';
import { CoursesController } from './controllers/courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoursesFilesController } from './controllers/courses.files.controller';
import { CoursesFilesService } from './providers/courses.files.service';
import { ActivityLogsModule } from 'src/activity-logs/activity-logs.module';

@Module({
  imports: [ActivityLogsModule, PrismaModule],
  controllers: [CoursesController, CoursesFilesController],
  providers: [CoursesService, CoursesFilesService],
})
export class CoursesModule {}
