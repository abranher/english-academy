import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      console.log('Ocurrio un error cargando las categorías', error);
      throw new InternalServerErrorException('Error al obtener las categorías');
    }
  }
}
