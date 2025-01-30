import { Module } from '@nestjs/common';
import { LevelsService } from './providers/levels.service';
import { LevelsController } from './controllers/levels.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
