import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseReviewDto } from '../dto/create-course-review.dto';
import { UpdateCourseReviewDto } from '../dto/update-course-review.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CourseReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseReviewDto: CreateCourseReviewDto) {
    return 'This action adds a new courseReview';
  }

  async findAll(courseId: string) {
    const ownCourse = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    const courseReviews = await this.prisma.courseReview.findMany({
      where: {
        courseId: ownCourse.id,
      },
    });

    return courseReviews;
  }

  async findAllForAdmin(courseId: string) {
    const ownCourse = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!ownCourse) throw new NotFoundException('Curso no encontrado.');

    const courseReviews = await this.prisma.courseReview.findMany({
      where: {
        courseId: ownCourse.id,
      },
      include: {
        course: true,
      },
    });

    return courseReviews.map((courseReview) => {
      const { ...rest } = courseReview;
      return {
        ...rest,
        reviewStatus: courseReview.course.reviewStatus,
      };
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} courseReview`;
  }

  update(id: number, updateCourseReviewDto: UpdateCourseReviewDto) {
    return `This action updates a #${id} courseReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseReview`;
  }
}
