import { Controller, Get, Param, Delete } from '@nestjs/common';
import { BackupService } from '../providers/backup.service';
import { join } from 'node:path';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get()
  async create() {
    return await this.backupService.createBackup();
  }

  @Get('list')
  async findAll() {
    const directoryPath = join(process.cwd(), './storage/backups');
    const files = await this.backupService.findAll(directoryPath);
    return files;
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
