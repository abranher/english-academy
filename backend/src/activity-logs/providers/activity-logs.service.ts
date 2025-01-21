import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, action: string) {
    const activityLog = await this.prisma.activityLog.create({
      data: {
        userId,
        action,
      },
    });

    return activityLog;
  }

  async findAll() {
    const activityLogs = await this.prisma.activityLog.findMany({
      include: {
        user: true,
      },
    });

    return activityLogs.map((activityLog) => ({
      ...activityLog,
      username: activityLog.user.username,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} activityLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityLog`;
  }
}
