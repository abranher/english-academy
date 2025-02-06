import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateClassDto } from '../dto/create-class.dto';
import { UpdateClassDto } from '../dto/update-class.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClassDto: CreateClassDto) {
    return 'This action adds a new class';
  }

  findAll() {
    return `This action returns all classes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  async update(id: string, lessonId: string, updateClassDto: UpdateClassDto) {
    const ownLesson = await this.prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!ownLesson) throw new NotFoundException('Lección no encontrada.');

    const lessonClass = await this.prisma.class.update({
      where: {
        id,
        lessonId: ownLesson.id,
      },
      data: updateClassDto,
    });

    return lessonClass;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
