import { Module } from '@nestjs/common';
import { CoursesService } from './providers/courses.service';
import { CoursesController } from './controllers/courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoursesFilesController } from './controllers/courses.files.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController, CoursesFilesController],
  providers: [CoursesService],
})
export class CoursesModule {}
