import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { UpdateTutorDto } from '../dto/update-tutor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class TutorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTutorDto: CreateTutorDto) {
    const userFound = await this.findByEmail(createTutorDto.email);

    if (userFound)
      throw new ConflictException(
        'La dirección de correo electrónico ya está en uso.',
      );

    const usernameFound = await this.findByUsername(createTutorDto.username);

    if (usernameFound)
      throw new ConflictException('El nombre de usuario ya está en uso.');

    const newUser = await this.prisma.user.create({
      data: {
        role: 'TUTOR',
        name: createTutorDto.name,
        lastName: createTutorDto.lastName,
        email: createTutorDto.email,
        username: createTutorDto.username,
        password: await hash(createTutorDto.password, 10),
      },
    });

    await this.prisma.tutor.create({
      data: {
        userId: newUser.id,
      },
    });

    return {
      message: 'Usuario creado exitosamente.',
    };
  }

  findAll() {
    return `This action returns all tutors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutor`;
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
