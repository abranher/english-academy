import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPurchaseDto: CreatePurchaseDto) {
    return 'This action adds a new purchase';
  }

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

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
