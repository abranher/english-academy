import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.price.findMany();
    } catch (error) {
      console.log('Ocurrio un error cargando los precios', error);
      throw new InternalServerErrorException('Error al obtener los precios');
    }
  }
}
