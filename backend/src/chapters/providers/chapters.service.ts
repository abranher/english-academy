import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChaptersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(courseId: string, createChapterDto: CreateChapterDto) {
    const courseOwner = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!courseOwner) throw new NotFoundException('Curso no encontrado.');

    const lastChapter = await this.prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await this.prisma.chapter.create({
      data: {
        title: createChapterDto.title,
        courseId,
        position: newPosition,
      },
    });

    return 'This action adds a new chapter';
  }

  findAll() {
    return `This action returns all chapters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
