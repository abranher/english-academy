import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import {
  Course,
  CourseReviewDecision,
  NotificationType,
  User,
} from '@prisma/client';
import { getYear } from 'date-fns';
import { CourseReviewDecisionTraduction } from 'src/libs/enum-translations/CourseReviewDecision';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class UpdatedCourseReview {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async send(
    user: User,
    feedback: string,
    decision: CourseReviewDecision,
    course: Course,
  ) {
    try {
      await this.toDB(user, decision, course);
      //await this.toMail(user, feedback, decision, course);
    } catch (error) {
      console.error('Error creando o enviando notificación:', error);
    }
  }

  async toDB(user: User, decision: CourseReviewDecision, course: Course) {
    await this.prisma.notification.create({
      data: {
        type: NotificationType.UPDATED_COURSE_REVIEW,
        data: {
          heading: 'Se ha actualizado un curso.',
          message: `La decisión: ${CourseReviewDecisionTraduction(decision)}.`,
          path: `/tutor/courses/${course.id}`,
        },
        userId: user.id,
      },
    });
  }

  async toMail(
    user: User,
    feedback: string,
    decision: CourseReviewDecision,
    course: Course,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Se ha actualizado un curso',
      template: './updated-course-review',
      context: {
        title: 'Actualización de Status',
        courseTitle: course.title,
        fullName: `${user.name} ${user.lastName}`,
        decision: CourseReviewDecisionTraduction(decision),
        feedback,
        companyName: this.config.get('APP_NAME'),
        supportEmail: this.config.get('SUPPORT_MAIL'),
        year: getYear(new Date()),
      },
    });
  }
}
