import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { PlatformAdminController } from './controllers/platform.admin.controller';
import { PlatformController } from './controllers/platform.controller';
import { PlatformAdminService } from './providers/platform.admin.service';
import { PlatformService } from './providers/platform.service';

@Module({
  imports: [UsersModule],
  controllers: [PlatformAdminController, PlatformController],
  providers: [PlatformAdminService, PlatformService],
})
export class PlatformModule {}
