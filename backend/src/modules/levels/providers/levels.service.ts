import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from '../dto/create-level.dto';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class LevelsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLevelDto: CreateLevelDto) {
    return 'This action adds a new level';
  }

  async findAll() {
    return await this.prisma.level.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
