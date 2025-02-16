import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Roles } from '@prisma/client';
import { hash } from 'bcrypt';
import { totp } from 'otplib';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { MailService } from 'src/modules/mail/providers/mail.service';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { BIOGRAPHY_DEFAULT } from '../constants';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import { UsersService } from 'src/modules/users/providers/users.service';

@Injectable()
export class TutorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly userService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async createEmail(createTutorDto: CreateTutorDto) {
    const userFound = await this.userService.findByEmail(createTutorDto.email);

    if (userFound)
      throw new ConflictException(
        'La dirección de correo electrónico ya está en uso.',
      );

    const newUser = await this.prisma.user.create({
      data: {
        role: Roles.TUTOR,
        email: createTutorDto.email,
        tutor: {
          create: {
            bio: BIOGRAPHY_DEFAULT,
          },
        },
      },
    });

    this.mail.sendEmailVerification(newUser);

    return {
      userId: newUser.id,
      message: 'Usuario creado!.',
    };
  }

  async verifyEmail(verifyTokenDto: VerifyTokenDto, userId: string) {
    const isValid = totp.check(
      verifyTokenDto.token,
      this.config.get('OTPLIB_SECRET'),
    );

    if (!isValid) {
      throw new BadRequestException('Token inválido o vencido.');
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { emailVerifiedAt: new Date() },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error al verificar el correo. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Email verificado exitosamente.' };
  }

  async createPassword(createTutorDto: CreateTutorDto, id: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await hash(createTutorDto.password, 10),
      },
    });

    return {
      message: 'Contraseña creada!!.',
    };
  }

  async createNames(createTutorDto: CreateTutorDto, id: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: createTutorDto.name,
        lastName: createTutorDto.lastName,
      },
    });

    return {
      message: 'Ya casi terminamos, solo un poco más.',
    };
  }

  async createUsername(createTutorDto: CreateTutorDto, id: string) {
    const usernameFound = await this.userService.findByUsername(
      createTutorDto.username,
    );

    if (usernameFound)
      throw new ConflictException('El nombre de usuario ya está en uso.');

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: createTutorDto.username,
      },
    });

    return {
      message:
        '¡Casi terminamos! Solo unos pasos más para completar tu registro.',
    };
  }

  async createBirth(createTutorDto: CreateTutorDto, id: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        birth: createTutorDto.birth,
      },
    });

    return {
      message: '¡Genial! Inicia sesión en tu nueva cuenta!',
    };
  }

  findAll() {
    return `This action returns all tutors`;
  }

  async findOne(userId: string) {
    const tutorUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tutor: true,
      },
    });

    return tutorUser;
  }
}
