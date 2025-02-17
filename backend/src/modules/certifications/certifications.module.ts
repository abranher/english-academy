import { Module } from '@nestjs/common';
import { CertificationsService } from './providers/certifications.service';
import { CertificationsController } from './controllers/certifications.controller';

@Module({
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
