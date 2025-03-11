import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { StudentsController } from './controllers/students.controller';
import { StudentsFilesController } from './controllers/students.files.controller';
import { StudentsService } from './providers/students.service';
import { StudentsFilesService } from './providers/students.files.service';

@Module({
  imports: [UsersModule],
  controllers: [StudentsController, StudentsFilesController],
  providers: [StudentsService, StudentsFilesService],
})
export class StudentsModule {}
