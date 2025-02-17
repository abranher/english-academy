import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { TutorsAdminController } from './controllers/tutors.admin.controller';
import { TutorsController } from './controllers/tutors.controller';
import { TutorsFilesController } from './controllers/tutors.files.controller';
import { TutorsService } from './providers/tutors.service';
import { TutorsAdminService } from './providers/tutors.admin.service';
import { TutorsFilesService } from './providers/tutors.files.service';

@Module({
  imports: [UsersModule],
  controllers: [TutorsController, TutorsFilesController, TutorsAdminController],
  providers: [TutorsService, TutorsFilesService, TutorsAdminService],
  exports: [TutorsService],
})
export class TutorsModule {}
