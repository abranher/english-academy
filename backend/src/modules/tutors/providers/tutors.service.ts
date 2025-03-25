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
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { MailService } from 'src/modules/mail/providers/mail.service';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { BIOGRAPHY_DEFAULT } from '../constants';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import { UsersService } from 'src/modules/users/providers/users.service';
import { UpdateTutorDto } from '../dto/update-tutor.dto';
import { UpdateTutorBioDto } from '../dto/update-tutor-bio.dto';

@Injectable()
export class TutorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly userService: UsersService,
    private readonly InfrastructureService: InfrastructureService,
    private readonly config: ConfigService,
  ) {}

  private async findUserOrThrow(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async createEmail(createTutorDto: CreateTutorDto) {
    const userFound = await this.userService.findByEmail(createTutorDto.email);

    if (userFound) throw new ConflictException('El email ya está en uso.');

    const newUser = await this.prisma.user.create({
      data: {
        role: Roles.TUTOR,
        email: createTutorDto.email,
        tutor: { create: { bio: BIOGRAPHY_DEFAULT } },
      },
    });

    this.mail.sendEmailVerification(newUser);

    return { userId: newUser.id, message: 'Usuario creado!.' };
  }

  async verifyEmail(verifyTokenDto: VerifyTokenDto, userId: string) {
    const isValid = totp.verify({
      token: verifyTokenDto.token,
      secret: this.config.get('OTPLIB_SECRET'),
    });

    if (!isValid) throw new BadRequestException('Token inválido o vencido.');

    const user = await this.findUserOrThrow(userId);

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

  async resendEmail(userId: string) {
    const user = await this.findUserOrThrow(userId);

    await this.mail.sendEmailVerification(user);

    return { message: 'Correo de verificación reenviado exitosamente.' };
  }

  async createPassword(createTutorDto: CreateTutorDto, id: string) {
    await this.findUserOrThrow(id);

    const hashedPassword = await hash(createTutorDto.password, 10);

    try {
      await this.prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Contraseña creada exitosamente.' };
  }

  async createNames(createTutorDto: CreateTutorDto, id: string) {
    const user = await this.findUserOrThrow(id);

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { name: createTutorDto.name, lastName: createTutorDto.lastName },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Ya casi terminamos, solo un poco más.' };
  }

  async createUsername(createTutorDto: CreateTutorDto, id: string) {
    const userFound = await this.userService.findByUsername(
      createTutorDto.username,
    );

    if (userFound)
      throw new ConflictException('El nombre de usuario ya está en uso.');

    try {
      await this.prisma.user.update({
        where: { id },
        data: { username: createTutorDto.username },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return {
      message:
        '¡Casi terminamos! Solo unos pasos más para completar tu registro.',
    };
  }

  async createBirth(createTutorDto: CreateTutorDto, id: string) {
    const user = await this.findUserOrThrow(id);

    let birthDate: Date | null = null;
    if (createTutorDto.birth) {
      const tempDate = new Date(createTutorDto.birth);
      birthDate = new Date(
        Date.UTC(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate(),
          tempDate.getHours(),
          tempDate.getMinutes(),
          tempDate.getSeconds(),
          tempDate.getMilliseconds(),
        ),
      );
    }

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { birth: birthDate },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: '¡Genial! solo un poco más!' };
  }

  async findOne(userId: string) {
    const tutorUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { tutor: true },
    });

    if (!tutorUser) throw new NotFoundException('Usuario no encontrado');

    return tutorUser;
  }

  async findTutorWithPaymentMethod(tutorId: string) {
    await this.InfrastructureService.findTutorOrThrow(tutorId);

    try {
      return await this.prisma.tutor.findUnique({
        where: { id: tutorId },
        include: {
          mobilePayment: { include: { bank: true } },
        },
      });
    } catch (error) {
      console.error('Error obteniendo el tutor:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async findOneWithPaymentMethod(userId: string) {
    try {
      const tutorUser = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          tutor: { include: { mobilePayment: { include: { bank: true } } } },
        },
      });

      if (!tutorUser) throw new NotFoundException('Usuario no encontrado');

      return tutorUser;
    } catch (error) {
      console.error('Error obteniendo el user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async findOneWithCertifications(userId: string) {
    const user = await this.findUserOrThrow(userId);

    try {
      const tutor = await this.prisma.tutor.findUnique({
        where: { userId: user.id },
        include: { certifications: true },
      });

      return {
        ...user,
        tutor: tutor || null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'Error al obtener datos del tutor',
      );
    }
  }

  async updateTutorProfile(userId: string, updateTutorDto: UpdateTutorDto) {
    const user = await this.findUserOrThrow(userId);

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: updateTutorDto,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Datos actualizados.' };
  }

  async updateTutorBio(userId: string, updateTutorBioDto: UpdateTutorBioDto) {
    const user = await this.findUserOrThrow(userId);

    try {
      await this.prisma.tutor.update({
        where: { userId: user.id },
        data: updateTutorBioDto,
      });
    } catch (error) {
      console.error('Error updating bio:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Biografía actualizada.' };
  }
}
