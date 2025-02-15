import { Controller, Post, Body } from '@nestjs/common';

import { MailService } from '../providers/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMailer(@Body() user: { email: string; name: string }) {
    await this.mailService.sendUserConfirmation(user);
  }
}
