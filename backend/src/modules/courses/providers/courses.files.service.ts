import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class CoursesFilesService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadImage(id: string, image: string) {
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        image,
      },
    });

    return course;
  }

  async uploadTrailer(id: string, trailer: string) {
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        trailer,
      },
    });

    return course;
  }
}
