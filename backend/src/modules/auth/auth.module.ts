import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AuthService } from './providers/auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
