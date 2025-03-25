import { Controller } from '@nestjs/common';

import { ClassProgressService } from '../providers/class-progress.service';

@Controller('class-progress')
export class ClassProgressController {
  constructor(private readonly classProgressService: ClassProgressService) {}
}
