import { Module } from '@nestjs/common';
import { BackupService } from './providers/backup.service';
import { BackupController } from './controllers/backup.controller';

@Module({
  controllers: [BackupController],
  providers: [BackupService],
})
export class BackupModule {}
