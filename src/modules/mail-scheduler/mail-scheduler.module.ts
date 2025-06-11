import { Module } from '@nestjs/common';
import { MailSchedulerController } from './mail-scheduler.controller';
import { MailSchedulerService } from './mail-scheduler.service';
import { MailSchedulerEventBridgeService } from './mail-scheduler.eventbridge.service';
import { MailProviderModule } from '../mail-provider/mail-provider.module';

@Module({
  controllers: [MailSchedulerController],
  providers: [MailSchedulerService, MailSchedulerEventBridgeService],
  imports: [MailProviderModule],
})
export class MailSchedulerModule {}
