import { Module } from '@nestjs/common';
import { SubcategoriesService } from './providers/subcategories.service';
import { SubcategoriesController } from './controllers/subcategories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
