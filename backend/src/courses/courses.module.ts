import { Module } from '@nestjs/common';
import { CoursesService } from './providers/courses.service';
import { CoursesController } from './controllers/courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
