import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // email
      const userFound = await this.findByEmail(createUserDto.email);

      if (userFound)
        throw new ConflictException(
          'La dirección de correo electrónico ya está en uso.',
        );

      // username
      const usernameFound = await this.findByUsername(createUserDto.username);

      if (usernameFound)
        throw new ConflictException('El nombre de usuario ya está en uso.');

      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await hash(createUserDto.password, 10),
        },
      });

      const { password, ...result } = newUser;

      return result;
    } catch (error) {
      console.error('Ocurrió un error inesperado:', error);

      return {
        message:
          'Ocurrió un error al crear el usuario. Inténtalo de nuevo más tarde.',
        status: 500,
      };
    }
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

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
