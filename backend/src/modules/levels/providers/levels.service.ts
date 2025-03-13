import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class LevelsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.level.findMany();
    } catch (error) {
      console.log('Ocurrio un error cargando los niveles', error);
      throw new InternalServerErrorException('Error al obtener los niveles');
    }
  }
}
