import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ActivityLogsModule } from 'src/modules/activity-logs/activity-logs.module';
import { CoursesController } from './controllers/courses.controller';
import { CoursesFilesController } from './controllers/courses.files.controller';
import { CoursesAdminController } from './controllers/courses.admin.controller';
import { CoursesLandingController } from './controllers/courses.landing.controller';
import { CoursesService } from './providers/courses.service';
import { CoursesFilesService } from './providers/courses.files.service';
import { CoursesAdminService } from './providers/courses.admin.service';
import { CoursesLandingService } from './providers/courses.landing.service';

@Module({
  imports: [ActivityLogsModule, PrismaModule],
  controllers: [
    CoursesController,
    CoursesFilesController,
    CoursesAdminController,
    CoursesLandingController,
  ],
  providers: [
    CoursesService,
    CoursesFilesService,
    CoursesAdminService,
    CoursesLandingService,
  ],
})
export class CoursesModule {}
