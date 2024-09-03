import { Module } from '@nestjs/common';
import { ChaptersService } from './providers/chapters.service';
import { ChaptersController } from './controllers/chapters.controller';

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule {}
