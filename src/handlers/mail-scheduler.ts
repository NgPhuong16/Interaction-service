import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { MailSchedulerCreatePayloadInterface } from '../utils/interfaces/mail-scheduler/mail-scheduler-payload.interface';
import { MailSchedulerService } from '../modules/mail-scheduler/mail-scheduler.service';
import { MailSchedulerModule } from '../modules/mail-scheduler/mail-scheduler.module';

export const handler: Handler = async (
  event: MailSchedulerCreatePayloadInterface,
) => {
  console.log('Event:', event);
  const app = await NestFactory.createApplicationContext(MailSchedulerModule);
  const processor = app.get(MailSchedulerService);
  try {
    await processor.getMailContentInfoAndSendToQueue(event);
  } finally {
    await app.close();
  }
};
