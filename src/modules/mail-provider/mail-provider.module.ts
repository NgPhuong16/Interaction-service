import { Module } from '@nestjs/common';
import { MailProviderController } from './mail-provider.controller';
import { MailProviderService } from './mail-provider.service';
import { MailProviderQueueService } from './mail-provider.queue.service';

@Module({
  controllers: [MailProviderController],
  providers: [
    MailProviderService,
    MailProviderQueueService,
  ],
  exports: [MailProviderService, MailProviderQueueService],
})
export class MailProviderModule {}
