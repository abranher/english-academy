import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(studentId: string) {
    const purchases = await this.prisma.purchase.findMany({
      where: {
        studentId,
      },
      include: {
        course: {
          include: {
            category: true,
            subcategory: true,
          },
        },
      },
    });

    return purchases;
  }

  async findOne(courseId: string) {
    const coursePurchased = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                class: true,
                quiz: true,
              },
            },
          },
        },
      },
    });

    return coursePurchased;
  }
}
