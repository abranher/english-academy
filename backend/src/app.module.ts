import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LevelsModule } from './levels/levels.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { ChaptersModule } from './chapters/chapters.module';
import { PurchasesModule } from './purchases/purchases.module';
import { StudentsModule } from './students/students.module';
import { TutorsModule } from './tutors/tutors.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';

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
    PurchasesModule,
    StudentsModule,
    TutorsModule,
    CategoriesModule,
    SubcategoriesModule,
  ],
})
export class AppModule {}
