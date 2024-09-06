import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chapter, Course, Level } from '@prisma/client';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPurchaseDto: CreatePurchaseDto) {
    return 'This action adds a new purchase';
  }

  findAll() {
    return `This action returns all purchases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  async findOneWithCourse(studentId: string, courseId: string) {
    const purchase = await this.prisma.purchase.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    return purchase;
  }

  async purchasedCourses(studentId: string) {
    type CourseWithProgressWithLevel = Course & {
      level: Level;
      chapters: Chapter[];
      progress: number | null;
    };

    const purchasedCourses = await this.prisma.purchase.findMany({
      where: {
        studentId,
      },
      select: {
        course: {
          include: {
            level: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasedCourses.map(
      (purchase) => purchase.course,
    ) as CourseWithProgressWithLevel[];

    /*
    for (const course of courses) {
      const progress = await getProgress(studentId, course.id);
      course['progress'] = progress;
    }
    */

    const completedCourses = courses.filter(
      (course) => course.progress === 100,
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100,
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
