import { MailConsumerProcessor } from '../modules/mail-consumer/mail-consumer.processor';
import { NestFactory } from '@nestjs/core';
import { MailConsumerModule } from '../modules/mail-consumer/mail-consumer.module';
import { Handler, SQSEvent } from 'aws-lambda';

export const handler: Handler = async (event: SQSEvent) => {
  const app = await NestFactory.createApplicationContext(MailConsumerModule);
  const processor = app.get(MailConsumerProcessor);

  try {
    await processor.processQueue(event);
  } catch (error) {
    console.error('MailConsumer Handler:: Error', error);
  } finally {
    await app.close();
  }
};
