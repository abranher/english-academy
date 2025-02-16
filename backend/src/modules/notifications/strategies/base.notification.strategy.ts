import { MailerService } from '@nestjs-modules/mailer';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

export abstract class BaseNotificationStrategy<T extends object> {
  protected abstract readonly type: string;
  protected abstract readonly emailTemplate: string;
  protected abstract readonly dataDto: new () => T;
  protected abstract shouldSendEmail(data: T): boolean;

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly mailer: MailerService,
  ) {}

  async validateData(data: any): Promise<T> {
    const dtoInstance = plainToClass(this.dataDto, data);
    await validateOrReject(dtoInstance);
    return dtoInstance;
  }

  async createNotification(userId: string, data: T) {
    return this.prisma.notification.create({
      data: {
        type: this.type,
        data: data as object,
        userId,
      },
    });
  }

  async sendEmail(userId: string, data: T) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    await this.mailer.sendMail({
      to: user.email,
      subject: this.getEmailSubject(data),
      template: this.emailTemplate,
      context: this.getEmailContext(data),
    });
  }

  async execute(userId: string, rawData: any) {
    const data = await this.validateData(rawData);
    const notification = await this.createNotification(userId, data);

    if (this.shouldSendEmail(data)) {
      await this.sendEmail(userId, data);
    }

    return notification;
  }

  protected abstract getEmailSubject(data: T): string;
  protected abstract getEmailContext(data: T): object;
}
