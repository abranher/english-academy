import { Module } from '@nestjs/common';
import { TutorsService } from './providers/tutors.service';
import { TutorsController } from './controllers/tutors.controller';

@Module({
  controllers: [TutorsController],
  providers: [TutorsService],
})
export class TutorsModule {}
