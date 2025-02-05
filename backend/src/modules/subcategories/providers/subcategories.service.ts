import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from '../dto/update-subcategory.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSubcategoryDto: CreateSubcategoryDto) {
    return 'This action adds a new subcategory';
  }

  findAll() {
    const subcategories = this.prisma.subCategory.findMany();

    return subcategories;
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategory`;
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return `This action updates a #${id} subcategory`;
  }
}
