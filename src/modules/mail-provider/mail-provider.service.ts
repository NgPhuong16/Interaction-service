import { Injectable } from '@nestjs/common';
import { MailProviderQueueService } from './mail-provider.queue.service';
import { MailPayloadInterface } from '@utils/interfaces/mail-provider/mail-payload.interface';

@Injectable()
export class MailProviderService {
  constructor(private readonly mailQueueService: MailProviderQueueService) {}

  /**
   * Enqueues a mail to be sent immediately.
   * @param {MailPayloadInterface} mailPayload - The payload containing mail details.
   * @returns {Promise<string>} - The message ID of the enqueued mail.
   */
  async enqueueMail({
    mailContentId,
    to,
    subject,
    templateName,
    context,
    replyEmails
  }: MailPayloadInterface) {
    return await this.mailQueueService.sendToQueue({
      mailContentId,
      to,
      subject,
      templateName,
      context,
      replyEmails
    });
  }
}
