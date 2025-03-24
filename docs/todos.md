# TODOS:

- Mostrar planes para tutor

* Crear una seccion donde el tutor pueda ver el plan que se quiere suscribir
* Agregar el id del plan en la url, y llamar al id del tutor
* Checkout donde pueda agregar los datos de su pago
* Enviar a admin
* Mostrar seccion donde pueda ver el status de su orden
* Crear seccion para gestionar la ordenes en el admin

* Suscripcion de tutor

* Prueba final del curso
* Certificado

* Mostrar cursos publicados y aprobados
* Mostrar cursos por categoria,
* mostrar cursos por nivel

* Mostrar clase
* Mostrar quiz

* listado de usuarios

# PARA DESPUES:

- Backups para windows
- Al verificar tutor necesita iniciar sesion nuevamente para poder pedir la data nueva
- Creamos un vista para mostrar todas las notificaciones -> 30 min
- La fecha de nacimiento del perfil, se guarda de una manera en la bd y luego se muestra como de otra
- rejected_at (fecha/hora del rechazo para eliminar en 24h)
- IMPORTANT: -> hacer el componente que crea las certificaciones del tutor igual al createAttachment

tengo esto:
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import axios from "@/config/axios";
import SessionService from "@/libs/auth/Session";
import { object, string, ZodError } from "zod";
import { Roles } from "@/types/enums";

class NotStudentError extends CredentialsSignin {
code = "No eres estudiante.";
}

class NotTutorError extends CredentialsSignin {
code = "No eres tutor.";
}

class NotAdminError extends CredentialsSignin {
code = "No eres administrador.";
}

class InvalidCredentialsError extends CredentialsSignin {
code = "Credenciales no validas";
}

class UserNotFound extends CredentialsSignin {
code = "Usuario no encontrado";
}

export const signInSchema = object({
email: string({ required_error: "Correo electrónico es requerido" })
.min(1, "Correo electrónico es requerido")
.email("Correo electrónico no válido"),
password: string({ required_error: "Contraseña es requerida" })
.min(1, "Contraseña es requerida")
.min(8, "La contraseña debe tener más de 8 caracteres")
.max(32, "La contraseña debe tener menos de 32 caracteres"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
providers: [
Credentials({
credentials: { email: {}, password: {}, type: {} },
authorize: async (credentials) => {
try {
const { email, password } = await signInSchema.parseAsync(
credentials
);

          const response = await axios.post("/api/auth/signin", {
            email,
            password,
          });

          const user = await response.data;

          if (credentials.type === user.user.role) {
            return user;
          }

          if (credentials.type === Roles.STUDENT) throw new NotStudentError();
          if (credentials.type === Roles.TUTOR) throw new NotTutorError();
          if (credentials.type === Roles.ADMIN) throw new NotAdminError();
        } catch (error) {
          if (error instanceof NotStudentError) throw new NotStudentError();

          if (error instanceof NotTutorError) throw new NotTutorError();

          if (error instanceof NotAdminError) throw new NotAdminError();

          if (error instanceof ZodError) {
            throw new InvalidCredentialsError();
          }

          if (error?.response?.status === 401) {
            throw new UserNotFound();
          }
        }
      },
    }),

],
callbacks: {
async jwt({ token, user, account }) {
if (account && user) return { ...token, ...user };
if (new Date().getTime() < token.backendTokens.expiresIn) return token;
return await SessionService.refreshToken(token);
},

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },

},
});

luego esto:

import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";
import { JWT } from "next-auth/jwt";

export default class SessionService {
static async refreshToken(token: JWT): Promise<JWT> {
const response = await fetch(
NEXT_PUBLIC_BACKEND_URL + "/api/auth/refresh",
{
method: "POST",
headers: {
authorization: `Refresh ${token.backendTokens.refreshToken}`,
},
}
);

    const data = await response.json();

    return {
      ...token,
      backendTokens: data,
    };

}
}

estas son las definiciones

import NextAuth from "next-auth";
import { User } from "@/types/models/User";

declare module "next-auth" {
interface Session {
user: User;

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };

}
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
interface JWT {
user: User;

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };

}
}

este es el back:

import {
Body,
Controller,
Get,
HttpCode,
HttpStatus,
Param,
Post,
Request,
UseGuards,
} from '@nestjs/common';

import { AuthService } from '../providers/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { SignInDto } from '../dto/auth.dto';
import { RefreshJwtGuard } from '../guards/refresh.guard';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

@HttpCode(HttpStatus.OK)
@Post('signin')
async signIn(@Body() signInDto: SignInDto) {
return await this.authService.signIn(signInDto);
}

@UseGuards(RefreshJwtGuard)
@Post('refresh')
async refreshToken(@Request() req) {
console.log('refreshed');

    return await this.authService.refreshToken(req.user);

}

@UseGuards(AuthGuard)
@Get('profile')
getProfile(@Request() req) {
return req.user;
}

@Get('user/:userId/tutor/profile')
getTutorProfile(@Param('userId') userId: string) {
return this.authService.getTutorProfile(userId);
}
}

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

const EXPIRE_TIME = 20 \* 1000;

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

import {
CanActivate,
ExecutionContext,
Injectable,
UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(
private jwtService: JwtService,
private readonly configService: ConfigService,
) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();
const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;

}

private extractTokenFromHeader(request: Request): string | undefined {
const [type, token] = request.headers.authorization?.split(' ') ?? [];
return type === 'Bearer' ? token : undefined;
}
}

import {
CanActivate,
ExecutionContext,
Injectable,
UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
constructor(
private jwtService: JwtService,
private readonly configService: ConfigService,
) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();
const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;

}

private extractTokenFromHeader(request: Request) {
const [type, token] = request.headers.authorization?.split(' ') ?? [];
return type === 'Refresh' ? token : undefined;
}
}
