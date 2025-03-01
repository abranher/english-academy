import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';

import { UsersService } from 'src/modules/users/providers/users.service';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { SignInDto } from '../dto/auth.dto';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (user && (await compare(signInDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto);

    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '120s',
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '120s',
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async getTutorProfile(userId: string) {
    const tutorUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tutor: { include: { certifications: true, tutorStatusHistory: true } },
      },
    });

    if (!tutorUser) throw new NotFoundException('Usuario no encontrado');

    return tutorUser;
  }
}
