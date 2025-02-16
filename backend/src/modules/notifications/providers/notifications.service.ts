import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { WelcomeNotificationStrategy } from '../strategies/welcome.notification.strategy';
import { NotificationType } from '../types/notifications.types';
import { BaseNotificationStrategy } from '../strategies/base.notification.strategy';
import { ValidationError } from 'class-validator';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class NotificationsService {
  private strategies: Map<string, BaseNotificationStrategy<any>> = new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly welcomeStrategy: WelcomeNotificationStrategy,
  ) {
    this.registerStrategies();
  }

  private registerStrategies() {
    this.strategies.set('welcome', this.welcomeStrategy);
  }

  async createNotification<T extends NotificationType>(
    type: T,
    userId: string,
    data: unknown,
  ) {
    const logger = new Logger(NotificationsService.name);
    const strategy = this.strategies.get(type);

    if (!strategy) {
      throw new BadRequestException(`Tipo de notificación no válido: ${type}`);
    }

    try {
      return await strategy.execute(userId, data);
    } catch (error) {
      // Manejo de errores de validación
      if (
        Array.isArray(error) &&
        error.every((e) => e instanceof ValidationError)
      ) {
        const errorMessages = error.flatMap((err) =>
          Object.values(err.constraints),
        );
        throw new BadRequestException(errorMessages.join(' | '));
      }

      // Manejo de errores de Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        logger.error(`Prisma Error: ${error.message}`, error.stack);

        switch (error.code) {
          case 'P2002':
            throw new ConflictException('Conflicto de datos único');
          case 'P2003':
            throw new BadRequestException('Referencia a dato inexistente');
          case 'P2025':
            throw new NotFoundException('Recurso no encontrado');
          default:
            throw new InternalServerErrorException('Error en base de datos');
        }
      }

      // Manejo de errores de correo
      if (error?.response?.code === 'EENVELOPE') {
        logger.error(`Email Error: ${error.message}`, error.stack);
        throw new BadRequestException('Error al enviar el correo electrónico');
      }

      // Manejo de errores genéricos
      logger.error(`Error inesperado: ${error?.message}`, error?.stack);
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
