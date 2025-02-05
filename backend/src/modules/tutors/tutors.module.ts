import { Module } from '@nestjs/common';
import { TutorsService } from './providers/tutors.service';
import { TutorsController } from './controllers/tutors.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TutorsController],
  providers: [TutorsService],
})
export class TutorsModule {}
