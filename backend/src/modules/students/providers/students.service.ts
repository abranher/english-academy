import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { hash } from 'bcrypt';
import { Roles } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { InfrastructureService } from 'src/modules/infrastructure/infrastructure.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { BIOGRAPHY_DEFAULT } from '../constants';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly InfrastructureService: InfrastructureService,
    private readonly userService: UsersService,
  ) {}

  private async findUserOrThrow(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async assignLevel(userId: string, createStudentDto: CreateStudentDto) {
    await this.findUserOrThrow(userId);

    try {
      await this.prisma.student.update({
        where: { userId },
        data: { levelId: createStudentDto.levelId, initialTestAt: new Date() },
      });

      return { message: 'Nivel asignado!' };
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }
  }

  async createEmail(createStudentDto: CreateStudentDto) {
    const userFound = await this.userService.findByEmail(
      createStudentDto.email,
    );

    if (userFound)
      throw new ConflictException(
        'La dirección de correo electrónico ya está en uso.',
      );

    const newUser = await this.prisma.user.create({
      data: {
        role: Roles.STUDENT,
        email: createStudentDto.email,
        student: { create: { bio: BIOGRAPHY_DEFAULT } },
      },
    });

    return {
      userId: newUser.id,
      message: 'Usuario creado!.',
    };
  }

  async createPassword(createStudentDto: CreateStudentDto, id: string) {
    await this.findUserOrThrow(id);

    const hashedPassword = await hash(createStudentDto.password, 10);

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

  async createNames(createStudentDto: CreateStudentDto, id: string) {
    await this.findUserOrThrow(id);

    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          name: createStudentDto.name,
          lastName: createStudentDto.lastName,
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
      );
    }

    return { message: 'Ya casi terminamos, solo un poco más.' };
  }

  async createUsername(createStudentDto: CreateStudentDto, id: string) {
    const userFound = await this.userService.findByUsername(
      createStudentDto.username,
    );

    if (userFound)
      throw new ConflictException('El nombre de usuario ya está en uso.');

    try {
      await this.prisma.user.update({
        where: { id },
        data: { username: createStudentDto.username },
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

  async createBirth(createStudentDto: CreateStudentDto, id: string) {
    const user = await this.findUserOrThrow(id);

    let birthDate: Date | null = null;
    if (createStudentDto.birth) {
      const tempDate = new Date(createStudentDto.birth);
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
    this.InfrastructureService.findUserOrThrow(userId);

    try {
      return await this.prisma.user.findUnique({
        where: { id: userId },
        include: { student: { include: { level: true } } },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor. Por favor intenta nuevamente.',
        error,
      );
    }
  }
}
