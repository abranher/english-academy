import { Module } from '@nestjs/common';
import { BackupService } from './providers/backup.service';
import { BackupController } from './controllers/backup.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BackupController],
  providers: [BackupService],
})
export class BackupModule {}
