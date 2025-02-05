import { Module } from '@nestjs/common';
import { ActivityLogsService } from './providers/activity-logs.service';
import { ActivityLogsController } from './controllers/activity-logs.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService],
  exports: [ActivityLogsService],
})
export class ActivityLogsModule {}
