import { Controller, Get, Param, Delete } from '@nestjs/common';
import { BackupService } from '../providers/backup.service';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get()
  async create() {
    return await this.backupService.createBackup();
  }

  @Get()
  findAll() {
    return this.backupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backupService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backupService.remove(+id);
  }
}
