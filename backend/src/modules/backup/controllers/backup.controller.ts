import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('restore')
  async restoreBackup(@Body() body: { filename: string }) {
    return this.backupService.restoreBackup(body.filename);
  }
}
