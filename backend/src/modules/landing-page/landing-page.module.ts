import { Module } from '@nestjs/common';
import { LandingPageService } from './providers/landing-page.service';
import { LandingPageController } from './controllers/landing-page.controller';

@Module({
  controllers: [LandingPageController],
  providers: [LandingPageService],
})
export class LandingPageModule {}
