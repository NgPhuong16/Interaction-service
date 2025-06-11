import { Module } from '@nestjs/common';
import { EmailRenderService } from './email-render/email-render.service';
import { MailConsumerProcessor } from './mail-consumer.processor';
import { MailConsumerService } from './mail-consumer.service';

@Module({
  providers: [
    MailConsumerProcessor,
    MailConsumerService,
    EmailRenderService,
  ],
})
export class MailConsumerModule {}
