import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from '../dto/create-price.dto';
import { UpdatePriceDto } from '../dto/update-price.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPriceDto: CreatePriceDto) {
    return 'This action adds a new price';
  }

  async findAll() {
    const prices = await this.prisma.price.findMany();

    return prices;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
