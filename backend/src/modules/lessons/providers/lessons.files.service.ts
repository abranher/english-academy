import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class LessonsFilesService {
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

  async uploadVideo(id: string, video: string) {
    const lessonOwner = await this.prisma.lesson.findUnique({
      where: {
        id,
      },
    });

    if (!lessonOwner) throw new NotFoundException('Lección no encontrada.');

    const lessonClass = await this.prisma.class.update({
      where: {
        lessonId: id,
      },
      data: {
        video,
      },
    });

    console.log('service');
    return lessonClass;
  }

  async createAttachment(id: string, url: string) {
    const courseOwner = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!courseOwner) throw new NotFoundException('Curso no encontrado.');

    const attachment = await this.prisma.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId: id,
      },
    });

    return attachment;
  }

  async removeAttachment(id: string, attachmentId: string) {
    const courseOwner = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!courseOwner) throw new NotFoundException('Curso no encontrado.');

    const attachment = await this.prisma.attachment.delete({
      where: {
        id: attachmentId,
        courseId: id,
      },
    });

    return attachment;
  }
}
