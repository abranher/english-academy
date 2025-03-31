import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { TutorsAdminController } from './controllers/tutors.admin.controller';
import { TutorsController } from './controllers/tutors.controller';
import { TutorsFilesController } from './controllers/tutors.files.controller';
import { TutorCoursesController } from './controllers/tutor.courses.controller';
import { TutorsDashboardController } from './controllers/tutors-dashboard.controller';
import { TutorsService } from './providers/tutors.service';
import { TutorsAdminService } from './providers/tutors.admin.service';
import { TutorsFilesService } from './providers/tutors.files.service';
import { TutorCoursesService } from './providers/tutor.courses.service';
import { TutorsDashboardService } from './providers/tutors-dashboard.service';

@Module({
  imports: [UsersModule],
  controllers: [
    TutorsController,
    TutorsFilesController,
    TutorsAdminController,
    TutorCoursesController,
    TutorsDashboardController,
  ],
  providers: [
    TutorsService,
    TutorsFilesService,
    TutorsAdminService,
    TutorCoursesService,
    TutorsDashboardService,
  ],
  exports: [TutorsService],
})
export class TutorsModule {}
