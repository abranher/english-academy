import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LevelsModule } from './levels/levels.module';
import { ChaptersModule } from './chapters/chapters.module';
import { StudentsModule } from './students/students.module';
import { TutorsModule } from './tutors/tutors.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { PricesModule } from './prices/prices.module';
import { LessonsModule } from './lessons/lessons.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './storage'),
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
  ],
})
export class AppModule {}
