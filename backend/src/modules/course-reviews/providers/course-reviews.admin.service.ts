import { Injectable, NotFoundException } from '@nestjs/common';

import { CourseReviewDecision, CourseReviewStatus } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UpdatedCourseReview } from 'src/modules/notifications/class/updated-course-review';
import { UpdateCourseReviewDto } from '../dto/update-course-review.dto';

@Injectable()
export class CourseReviewsAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly updatedCourseReview: UpdatedCourseReview,
  ) {}

  private async findCourseById(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) throw new NotFoundException('Curso no encontrado.');

    return course;
  }

  async findAll(courseId: string) {
    const course = await this.findCourseById(courseId);

    return await this.prisma.courseReview.findMany({
      where: { courseId: course.id },
    });
  }

  async update(
    courseReviewId: string,
    userId: string,
    updateCourseReviewDto: UpdateCourseReviewDto,
  ) {
    const courseReview = await this.prisma.courseReview.findUnique({
      where: { id: courseReviewId },
    });

    if (!courseReview)
      throw new NotFoundException('Revisión del curso no encontrado.');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado.');

    if (updateCourseReviewDto.decision === CourseReviewDecision.NEEDS_CHANGES) {
      const courseReviewUpdated = await this.prisma.courseReview.update({
        where: { id: courseReview.id },
        data: {
          feedback: updateCourseReviewDto.feedback,
          decision: CourseReviewDecision.NEEDS_CHANGES,
          reviewedAt: new Date(),
        },
      });

      const courseUpdated = await this.prisma.course.update({
        where: { id: courseReviewUpdated.courseId },
        data: { reviewStatus: CourseReviewStatus.NEEDS_REVISION },
      });

      await this.updatedCourseReview.send(
        user,
        updateCourseReviewDto.feedback,
        updateCourseReviewDto.decision,
        courseUpdated,
      );

      return { message: 'Revisión del curso actualizado.' };
    } else if (
      updateCourseReviewDto.decision === CourseReviewDecision.APPROVED
    ) {
      const courseReviewUpdated = await this.prisma.courseReview.update({
        where: { id: courseReview.id },
        data: {
          feedback: updateCourseReviewDto.feedback,
          decision: CourseReviewDecision.APPROVED,
          reviewedAt: new Date(),
        },
      });

      const courseUpdated = await this.prisma.course.update({
        where: { id: courseReviewUpdated.courseId },
        data: { reviewStatus: CourseReviewStatus.APPROVED },
      });

      await this.updatedCourseReview.send(
        user,
        updateCourseReviewDto.feedback,
        updateCourseReviewDto.decision,
        courseUpdated,
      );

      return { message: 'Revisión del curso actualizado.' };
    }
  }
}
