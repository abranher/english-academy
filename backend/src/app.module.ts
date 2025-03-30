import { join } from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LevelsModule } from './modules/levels/levels.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { StudentsModule } from './modules/students/students.module';
import { TutorsModule } from './modules/tutors/tutors.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { PricesModule } from './modules/prices/prices.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { ActivityLogsModule } from './modules/activity-logs/activity-logs.module';
import { BackupModule } from './modules/backup/backup.module';
import { ClassesModule } from './modules/classes/classes.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { CourseReviewsModule } from './modules/course-reviews/course-reviews.module';
import { MailModule } from './modules/mail/mail.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CertificationsModule } from './modules/certifications/certifications.module';
import { AdminModule } from './modules/admin/admin.module';
import { TutorStatusHistoryModule } from './modules/tutor-status-history/tutor-status-history.module';
import { QuizQuestionsModule } from './modules/quiz-questions/quiz-questions.module';
import { QuizQuestionOptionsModule } from './modules/quiz-question-options/quiz-question-options.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { ClassAttachmentsModule } from './modules/class-attachments/class-attachments.module';
import { LandingPageModule } from './modules/landing-page/landing-page.module';
import { MobilePaymentsModule } from './modules/mobile-payments/mobile-payments.module';
import { BanksModule } from './modules/banks/banks.module';
import { PlatformModule } from './modules/platform/platform.module';
import { PlansModule } from './modules/plans/plans.module';
import { SubscriptionOrdersModule } from './modules/subscription-orders/subscription-orders.module';
import { SubscriptionOrderHistoryModule } from './modules/subscription-order-history/subscription-order-history.module';
import { InfrastructureModule } from './modules/infrastructure/infrastructure.module';
import { EnrollmentOrdersModule } from './modules/enrollment-orders/enrollment-orders.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { ClassProgressModule } from './modules/class-progress/class-progress.module';
import { EnrollmentOrderHistoryModule } from './modules/enrollment-order-history/enrollment-order-history.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './public'),
      serveStaticOptions: { index: false },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LevelsModule,
    ChaptersModule,
    StudentsModule,
    TutorsModule,
    CategoriesModule,
    SubcategoriesModule,
    PricesModule,
    LessonsModule,
    ActivityLogsModule,
    BackupModule,
    ClassesModule,
    QuizzesModule,
    CourseReviewsModule,
    MailModule,
    NotificationsModule,
    CertificationsModule,
    AdminModule,
    TutorStatusHistoryModule,
    QuizQuestionsModule,
    QuizQuestionOptionsModule,
    AttachmentsModule,
    ClassAttachmentsModule,
    LandingPageModule,
    MobilePaymentsModule,
    BanksModule,
    PlatformModule,
    PlansModule,
    SubscriptionOrdersModule,
    SubscriptionOrderHistoryModule,
    InfrastructureModule,
    EnrollmentOrdersModule,
    EnrollmentsModule,
    ClassProgressModule,
    EnrollmentOrderHistoryModule,
  ],
})
export class AppModule {}
