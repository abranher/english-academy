import { Controller, Get, Param, Put } from '@nestjs/common';

import { ClassProgressService } from '../providers/class-progress.service';

@Controller('class-progress')
export class ClassProgressController {
  constructor(private readonly classProgressService: ClassProgressService) {}

  /**
   * Get Class with ClassProgress
   */
  @Get('student/:studentId/class/:classId')
  findOne(
    @Param('studentId') studentId: string,
    @Param('classId') classId: string,
  ) {
    return this.classProgressService.findOne(studentId, classId);
  }

  /**
   * Mark a class as completed for a student
   */
  @Put('student/:studentId/class/:classId/mark-as-read')
  async markAsCompleted(
    @Param('studentId') studentId: string,
    @Param('classId') classId: string,
  ) {
    return this.classProgressService.updateProgress(studentId, classId);
  }
}
