import { Injectable } from '@nestjs/common';
import { UpdateTutorDto } from '../dto/update-tutor.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class TutorsAdminService {
  constructor(private readonly prisma: PrismaService) {}

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
