import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { PlatformService } from './providers/platform.service';
import { PlatformController } from './controllers/platform.controller';

@Module({
  imports: [UsersModule],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
