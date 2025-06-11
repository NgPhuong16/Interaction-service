import { BadRequestException, Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { appConfig } from '@configs/app.config';
import { MESSAGES } from '@utils/constants';
import { MailPayloadInterface } from '@utils/interfaces/mail-provider/mail-payload.interface';

@Injectable()
export class MailProviderQueueService {
  private sqs: SQSClient;

  constructor() {
    this.sqs = new SQSClient({
      region: appConfig().AWS_REGION,
    });
  }

  /**
   * Sends a mail message to the SQS queue.
   * @param {MailPayloadInterface} mailMessage - The mail message to be sent.
   * @returns {Promise<string>} - The message ID of the sent message.
   * @throws {BadRequestException} - If sending the message fails.
   */
  async sendToQueue(mailMessage: MailPayloadInterface) {
    const command = new SendMessageCommand({
      QueueUrl: appConfig().SQS_QUEUE_URL,
      MessageBody: JSON.stringify(mailMessage),
    });
    console.log('MailProviderQueueService@sendToQueue:: ', command);
    try {
      const { MessageId } = await this.sqs.send(command);
      console.log('MailProviderQueueService@sendToQueue:: ', MessageId);
      return MessageId;
    } catch (error) {
      console.error('MailProviderQueueService@sendToQueue:: ', error);
      throw new BadRequestException(MESSAGES.SQS.FAILED_TO_SEND_MESSAGE);
    }
  }
}
