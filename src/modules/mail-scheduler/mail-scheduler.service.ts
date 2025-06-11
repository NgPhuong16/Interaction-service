import { Injectable } from '@nestjs/common';
import {
  MailSchedulerCreatePayloadInterface,
  MailSchedulerUpdatePayloadInterface,
  MailSchedulerDeletePayloadInterface,
  MailSchedulerDeleteBatchPayloadInterface,
} from '@utils/interfaces/mail-scheduler/mail-scheduler-payload.interface';
import { MailSchedulerEventBridgeService } from './mail-scheduler.eventbridge.service';
// Update the import path to the correct relative path for your project structure
import { getMethodToAdminBackend } from '../../helpers';
import { MailProviderService } from '../mail-provider/mail-provider.service';
import { ADMIN_BACKEND_ROUTE } from '@utils/constants';

@Injectable()
export class MailSchedulerService {
  constructor(
    private readonly mailScheduleEventBridgeService: MailSchedulerEventBridgeService,
    private readonly mailProviderService: MailProviderService,
  ) {}

  /**
   * Creates a schedule to send a message to the queue at a specified time.
   * Throws an error if the schedule time is in the past.
   *
   * @param mailContentId - The ID of the mail content to be scheduled.
   * @param scheduleTime - The time when the message should be sent.
   * @param scheduleGroupName - The name of the schedule group.
   * @returns An object containing the name of the created schedule.
   */
  async createScheduleSendMessageToQueue({
    mailContentId,
    scheduleTime,
    scheduleGroupName,
  }: MailSchedulerCreatePayloadInterface) {
    const { scheduleName } =
      await this.mailScheduleEventBridgeService.createScheduleRule({
        mailContentId,
        scheduleTime,
        scheduleGroupName,
      });
    return { scheduleName };
  }

  /**
   * Updates an existing schedule to send a message to the queue at a new specified time.
   * Throws an error if the new schedule time is in the past.
   *
   * @param mailContentId - The ID of the mail content to be updated.
   * @param scheduleTime - The new time when the message should be sent.
   * @param scheduleGroupName - The name of the schedule group.
   */
  async updateScheduleSendMessageToQueue({
    mailContentId,
    scheduleTime,
    scheduleGroupName,
  }: MailSchedulerUpdatePayloadInterface) {
    const { message } =
      await this.mailScheduleEventBridgeService.updateScheduleRule({
        mailContentId,
        scheduleTime,
        scheduleGroupName,
      });
    return { message };
  }

  /**
   * Deletes a schedule to send a message to the queue.
   *
   * @param mailContentId - The ID of the mail content whose schedule is to be deleted.
   * @param scheduleGroupName - The name of the schedule group.
   */
  async deleteScheduleSendMessageToQueue({
    mailContentId,
    scheduleGroupName,
  }: MailSchedulerDeletePayloadInterface) {
    const { message } =
      await this.mailScheduleEventBridgeService.deleteScheduleRule({
        mailContentId,
        scheduleGroupName,
      });
    return { message };
  }

  async getMailContentInfoAndSendToQueue({
    mailContentId,
    scheduleTime,
    scheduleGroupName,
  }: MailSchedulerCreatePayloadInterface) {
    const response = await getMethodToAdminBackend({
      url: `${ADMIN_BACKEND_ROUTE.MAIL_DETAIL}/${mailContentId}`,
    });
    const mailContentInfoWithReceivers = response?.data;
    console.log();
    const messageId = await this.mailProviderService.enqueueMail(
      mailContentInfoWithReceivers,
    );
    console.log(
      'MailSchedulerService@getMailContentInfoAndSendToQueue:: messageId',
      messageId,
    );
  }

  async deleteBatchScheduleSendMessageToQueue({
    mailContentIdArr,
    scheduleGroupName,
  }: MailSchedulerDeleteBatchPayloadInterface) {
    await Promise.allSettled(
      mailContentIdArr.map((mailContentId) =>
        this.mailScheduleEventBridgeService.deleteScheduleRule({
          mailContentId,
          scheduleGroupName,
        }),
      ),
    );
  }
}
