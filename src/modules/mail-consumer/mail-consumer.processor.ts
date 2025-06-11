import { Injectable } from '@nestjs/common';
import { MailConsumerService } from './mail-consumer.service';
import { SQSEvent } from 'aws-lambda';

@Injectable()
export class MailConsumerProcessor {
  constructor(private readonly consumerService: MailConsumerService) {}

  async processQueue(event: SQSEvent): Promise<void> {
    console.log('MailConsumerProcessor@processQueue:: event', event);
    console.log(
      'MailConsumerProcessor@processQueue:: event.Records',
      event.Records,
    );
    for (const record of event.Records) {
      const { messageId, body } = record;
      const payload = JSON.parse(body);
      await this.consumerService.processEmailMessage({
        queueMessageId: messageId,
        mailMessage: payload,
      });
    }
  }
}
