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
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { ActivityLogsModule } from './modules/activity-logs/activity-logs.module';
import { BackupModule } from './modules/backup/backup.module';
import { ClassesModule } from './modules/classes/classes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './public'),
    }),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    PurchaseOrdersModule,
    PurchasesModule,
    ActivityLogsModule,
    BackupModule,
    ClassesModule,
  ],
})
export class AppModule {}
