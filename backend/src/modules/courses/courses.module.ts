import { Module } from '@nestjs/common';

import { ActivityLogsModule } from 'src/modules/activity-logs/activity-logs.module';
import { CoursesController } from './controllers/courses.controller';
import { CoursesFilesController } from './controllers/courses.files.controller';
import { CoursesAdminController } from './controllers/courses.admin.controller';
import { CoursesService } from './providers/courses.service';
import { CoursesFilesService } from './providers/courses.files.service';
import { CoursesAdminService } from './providers/courses.admin.service';

@Module({
  imports: [ActivityLogsModule],
  controllers: [
    CoursesController,
    CoursesFilesController,
    CoursesAdminController,
  ],
  providers: [CoursesService, CoursesFilesService, CoursesAdminService],
})
export class CoursesModule {}
