import { Injectable, NotFoundException } from '@nestjs/common';

import { NotificationsService } from 'src/modules/notifications/providers/notifications.service';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { UsersService } from 'src/modules/users/providers/users.service';

@Injectable()
export class TutorStatusHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly userService: UsersService,
  ) {}

  private async findUserOrThrow(id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
