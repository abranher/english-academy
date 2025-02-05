import { Module } from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
