import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}
}
