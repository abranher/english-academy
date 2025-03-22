import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { MobilePaymentsController } from './controllers/mobile-payments.controller';
import { MobilePaymentsAdminController } from './controllers/mobile-payments.admin.controller';
import { MobilePaymentsService } from './providers/mobile-payments.service';
import { MobilePaymentsAdminService } from './providers/mobile-payments.admin.service';

@Module({
  imports: [UsersModule],
  controllers: [MobilePaymentsController, MobilePaymentsAdminController],
  providers: [MobilePaymentsService, MobilePaymentsAdminService],
})
export class MobilePaymentsModule {}
