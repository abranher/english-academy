import { ConflictException, Injectable } from '@nestjs/common';

import { Roles } from '@prisma/client';
import { hash } from 'bcrypt';

import { NotificationsService } from 'src/modules/notifications/providers/notifications.service';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { UpdateTutorDto } from '../dto/update-tutor.dto';
import { BIOGRAPHY_DEFAULT } from '../constants';
import { NotificationType } from 'src/modules/notifications/types/notifications.types';

@Injectable()
export class TutorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  async createEmail(createTutorDto: CreateTutorDto) {
    const userFound = await this.findByEmail(createTutorDto.email);

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

    await this.notifications.createNotification(
      'email-verification',
      newUser.id,
      {
        orderId: 123,
        trackingNumber: 'ABC123',
        user: { preferences: { receiveShippingEmails: true } },
      },
    );

    return {
      userId: newUser.id,
      message: 'Usuario creado!.',
    };
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
    const usernameFound = await this.findByUsername(createTutorDto.username);

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

  update(id: number, updateTutorDto: UpdateTutorDto) {
    return `This action updates a #${id} tutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
