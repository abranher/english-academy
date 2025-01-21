import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BackupService } from '../providers/backup.service';
import { CreateBackupDto } from '../dto/create-backup.dto';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post()
  create(@Body() createBackupDto: CreateBackupDto) {
    return this.backupService.create(createBackupDto);
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
