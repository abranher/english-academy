import { Module } from '@nestjs/common';
import { ChaptersService } from './providers/chapters.service';
import { ChaptersController } from './controllers/chapters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule {}
