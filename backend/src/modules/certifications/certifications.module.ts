import { Module } from '@nestjs/common';

import { CertificationsService } from './providers/certifications.service';
import { CertificationsController } from './controllers/certifications.controller';
import { TutorsModule } from '../tutors/tutors.module';

@Module({
  imports: [TutorsModule],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
