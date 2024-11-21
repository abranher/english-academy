import { Module } from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
