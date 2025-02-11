import { Module } from '@nestjs/common';
import { TutorsService } from './providers/tutors.service';
import { TutorsController } from './controllers/tutors.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { TutorsAdminService } from './providers/tutors.admin.service';
import { TutorsAdminController } from './controllers/tutors.admin.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TutorsController, TutorsAdminController],
  providers: [TutorsService, TutorsAdminService],
})
export class TutorsModule {}
