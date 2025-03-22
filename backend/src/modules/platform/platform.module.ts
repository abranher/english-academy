import { Module } from '@nestjs/common';

import { UsersService } from '../users/providers/users.service';
import { PlatformService } from './providers/platform.service';
import { PlatformController } from './controllers/platform.controller';

@Module({
  imports: [UsersService],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
