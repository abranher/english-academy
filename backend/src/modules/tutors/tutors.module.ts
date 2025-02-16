import { Module } from '@nestjs/common';

import { TutorsService } from './providers/tutors.service';
import { TutorsController } from './controllers/tutors.controller';
import { TutorsAdminService } from './providers/tutors.admin.service';
import { TutorsAdminController } from './controllers/tutors.admin.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TutorsController, TutorsAdminController],
  providers: [TutorsService, TutorsAdminService],
})
export class TutorsModule {}
