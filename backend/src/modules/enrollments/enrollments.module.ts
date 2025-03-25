import { Module } from '@nestjs/common';
import { EnrollmentsService } from './providers/enrollments.service';
import { EnrollmentsController } from './controllers/enrollments.controller';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
