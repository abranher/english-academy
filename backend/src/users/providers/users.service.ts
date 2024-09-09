import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.findByEmail(createUserDto.email);

    if (userFound)
      throw new ConflictException(
        'La dirección de correo electrónico ya está en uso.',
      );

    const usernameFound = await this.findByUsername(createUserDto.username);

    if (usernameFound)
      throw new ConflictException('El nombre de usuario ya está en uso.');

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });

    return {
      message: 'Usuario creado exitosamente.',
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        student: true,
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
