import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.subCategory.findMany();
    } catch (error) {
      console.log('Error al obtener las subcategorías ');
      throw new InternalServerErrorException(
        'Error al obtener las subcategorías',
      );
    }
  }
}
