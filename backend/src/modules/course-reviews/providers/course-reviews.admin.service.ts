import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseReviewDto } from '../dto/create-course-review.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class CourseReviewsAdminService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseReviewDto: CreateCourseReviewDto) {
    return 'This action adds a new courseReview';
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
}
