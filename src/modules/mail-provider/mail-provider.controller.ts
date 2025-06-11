import { Controller, Post, Body, Res } from '@nestjs/common';
import { MailProviderService } from './mail-provider.service';
import { MailPayloadDto } from './dtos/mail-payload.dto';
import { Response } from 'express';
import { SuccessResponse } from '@utils/response';
import { MailPayloadInterface } from '@utils/interfaces/mail-provider/mail-payload.interface';

@Controller('mail/immediately')
export class MailProviderController {
  constructor(private readonly mailService: MailProviderService) {}

  @Post('/')
  async sendMailToQueue(
    @Body() mailPayload: MailPayloadDto,
    @Res() res: Response,
  ) {
    const { mailContentId, to, subject, templateName, context, replyEmails } =
      mailPayload;
    console.log('Mail Payload:', mailPayload);
    const messageId = await this.mailService.enqueueMail({
      mailContentId,
      to,
      subject,
      templateName,
      context,
      replyEmails,
    } as MailPayloadInterface);
    return new SuccessResponse({
      message: 'Mail enqueued successfully',
      metadata: {
        messageId,
      },
    }).send(res);
  }
}
