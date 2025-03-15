import { Module } from '@nestjs/common';

import { ClassesController } from './controllers/classes.controller';
import { ClassesFilesController } from './controllers/classes.files.controller';
import { ClassesService } from './providers/classes.service';
import { ClassesFilesService } from './providers/classes.files.service';

@Module({
  controllers: [ClassesController, ClassesFilesController],
  providers: [ClassesService, ClassesFilesService],
})
export class ClassesModule {}
