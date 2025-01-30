import { Module } from '@nestjs/common';
import { StudentsService } from './providers/students.service';
import { StudentsController } from './controllers/students.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
