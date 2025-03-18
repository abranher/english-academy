import { Controller, Get } from '@nestjs/common';

import { LandingPageService } from '../providers/landing-page.service';

@Controller('landing-page')
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}

  @Get('courses')
  getCourses() {
    return this.landingPageService.getCourses();
  }
}
