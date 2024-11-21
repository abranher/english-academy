import { Module } from '@nestjs/common';
import { SubcategoriesService } from './providers/subcategories.service';
import { SubcategoriesController } from './controllers/subcategories.controller';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
