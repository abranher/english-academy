import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmail(createStudentDto: CreateStudentDto) {
    const userFound = await this.findByEmail(createStudentDto.email);

    if (userFound)
      throw new ConflictException(
        'La dirección de correo electrónico ya está en uso.',
      );

    const newUser = await this.prisma.user.create({
      data: {
        email: createStudentDto.email,
      },
    });

    await this.prisma.student.create({
      data: {
        userId: newUser.id,
      },
    });

    return {
      message: 'Usuario creado!.',
    };
  }

  async createPassword(createStudentDto: CreateStudentDto) {
    const userFound = await this.findByEmail(createStudentDto.email);

    if (userFound)
      throw new ConflictException(
        'La dirección de correo electrónico ya está en uso.',
      );

    const usernameFound = await this.findByUsername(createStudentDto.username);

    if (usernameFound)
      throw new ConflictException('El nombre de usuario ya está en uso.');

    const newUser = await this.prisma.user.create({
      data: {
        name: createStudentDto.name,
        lastName: createStudentDto.lastName,
        email: createStudentDto.email,
        username: createStudentDto.username,
        password: await hash(createStudentDto.password, 10),
      },
    });

    await this.prisma.student.create({
      data: {
        userId: newUser.id,
      },
    });

    return {
      message: 'Usuario creado exitosamente.',
    };
  }

  async createUsername(createStudentDto: CreateStudentDto) {
    const userFound = await this.findByEmail(createStudentDto.email);

    if (userFound)
      throw new ConflictException(
        'La dirección de correo electrónico ya está en uso.',
      );

    const usernameFound = await this.findByUsername(createStudentDto.username);

    if (usernameFound)
      throw new ConflictException('El nombre de usuario ya está en uso.');

    const newUser = await this.prisma.user.create({
      data: {
        name: createStudentDto.name,
        lastName: createStudentDto.lastName,
        email: createStudentDto.email,
        username: createStudentDto.username,
        password: await hash(createStudentDto.password, 10),
      },
    });

    await this.prisma.student.create({
      data: {
        userId: newUser.id,
      },
    });

    return {
      message: 'Usuario creado exitosamente.',
    };
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
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
