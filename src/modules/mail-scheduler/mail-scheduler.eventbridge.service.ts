import { Injectable } from '@nestjs/common';
import {
  SchedulerClient,
  CreateScheduleCommand,
  CreateScheduleGroupCommand,
  DeleteScheduleGroupCommand,
  UpdateScheduleCommand,
  DeleteScheduleCommand,
} from '@aws-sdk/client-scheduler';
import { appConfig } from '../../configs/app.config';
import { EVENT_BRIDGE_SCHEDULER } from '@utils/constants';
import {
  MailSchedulerCreatePayloadInterface,
  MailSchedulerUpdatePayloadInterface,
  MailSchedulerDeletePayloadInterface,
} from '@utils/interfaces/mail-scheduler/mail-scheduler-payload.interface';
import { formatDateTime } from '@utils/date';
import { convertIdToScheduleRuleName } from '../../helpers';
@Injectable()
export class MailSchedulerEventBridgeService {
  private eventBridge: SchedulerClient;

  constructor() {
    this.eventBridge = new SchedulerClient({
      region: appConfig().AWS_REGION,
    });
  }

  /**
   * Creates a schedule rule in EventBridge Scheduler to send a message at a specified time.
   * The rule is created with a unique name based on the mail content ID and the scheduled time.
   * The target is set to a Lambda function that will handle the message sending.
   *
   * @param param0 Object containing the mail content ID, schedule time, and schedule group name.
   * @throws BadRequestException if the schedule time is in the past.
   */
  async createScheduleRule({
    mailContentId,
    scheduleTime,
    scheduleGroupName,
  }: MailSchedulerCreatePayloadInterface) {
    const scheduleDateString = formatDateTime(scheduleTime);
    const scheduleName = convertIdToScheduleRuleName(mailContentId);

    console.log(
      'MailSchedulerEventBridgeService@setScheduleRule scheduleDateString:',
      scheduleDateString,
    );

    const command = new CreateScheduleCommand({
      Name: scheduleName,
      ScheduleExpression: `at(${scheduleDateString})`,
      Target: {
        Arn: appConfig().LAMBDA_SCHEDULER_ARN,
        RoleArn: appConfig().SCHEDULER_ROLE_ARN,
        Input: JSON.stringify({
          mailContentId,
          scheduleTime,
          scheduleGroupName,
        }),
      },
      GroupName: scheduleGroupName,
      FlexibleTimeWindow: { Mode: 'OFF' },
      State: 'ENABLED',
    });
    const response = await this.eventBridge.send(command);

    console.log(
      'MailSchedulerEventBridgeService@setScheduleRule Target added:',
      response,
    );
    return { scheduleName };
  }

  /**
   * Updates an existing schedule rule in EventBridge Scheduler.
   * The rule is updated with a new schedule time and the target remains the same.
   *
   * @param param0 Object containing the mail content ID, new schedule time, and schedule group name.
   */
  async updateScheduleRule({
    mailContentId,
    scheduleTime,
    scheduleGroupName,
  }: MailSchedulerUpdatePayloadInterface) {
    const scheduleDateString = formatDateTime(scheduleTime);
    const scheduleName = convertIdToScheduleRuleName(mailContentId);
    console.log(
      'MailSchedulerEventBridgeService@updateScheduleRule scheduleDateString:',
      scheduleDateString,
    );

    const command = new UpdateScheduleCommand({
      Name: scheduleName,
      ScheduleExpression: `at(${scheduleDateString})`,
      Target: {
        Arn: appConfig().LAMBDA_SCHEDULER_ARN,
        RoleArn: appConfig().SCHEDULER_ROLE_ARN,
        Input: JSON.stringify({ mailContentId, scheduleTime }),
      },
      GroupName: scheduleGroupName,
      FlexibleTimeWindow: { Mode: 'OFF' },
      State: 'ENABLED',
    });
    const response = await this.eventBridge.send(command);
    console.log(
      'MailSchedulerEventBridgeService@updateScheduleRule Target updated:',
      response,
    );
    return {
      message: `Schedule updated successfully for mailContentId: ${mailContentId}, scheduleName: ${scheduleName}`,
    };
  }

  /**
   * Deletes a schedule rule in EventBridge Scheduler.
   * This will remove the scheduled event and its associated target.
   *
   * @param param0 Object containing the mail content ID and schedule group name.
   * @returns The response from the DeleteScheduleCommand.
   */
  async deleteScheduleRule({
    mailContentId,
    scheduleGroupName,
  }: MailSchedulerDeletePayloadInterface) {
    const scheduleName = convertIdToScheduleRuleName(mailContentId);
    const command = new DeleteScheduleCommand({
      Name: scheduleName,
      GroupName: scheduleGroupName,
    });
    const response = await this.eventBridge.send(command);
    console.log(
      'MailSchedulerEventBridgeService@deleteScheduleRule Schedule deleted:',
      response,
    );
    return {
      message: `Schedule deleted successfully for mailContentId: ${mailContentId}, scheduleName: ${scheduleName}`,
    };
  }

  /**
   * Creates a schedule group in EventBridge Scheduler.
   * If no name is provided, uses the default group name from EVENT_BRIDGE_SCHEDULER.
   * This group can be used to logically group scheduled events for easier management.
   *
   * @param param0 Object containing the group name.
   * @see createScheduleGroup
   */
  async createScheduleGroup({
    name = EVENT_BRIDGE_SCHEDULER.GROUP_NAME.MESSAGE_SCHEDULER,
  }: {
    name: string;
  }) {
    const groupName = name;
    const command = new CreateScheduleGroupCommand({
      Name: groupName,
    });
    const response = await this.eventBridge.send(command);
    console.log(
      'MailSchedulerEventBridgeService@createScheduleGroup Group created:',
      response,
    );
  }

  /**
   * Deletes a schedule group in EventBridge Scheduler.
   * If no name is provided, uses the default group name from EVENT_BRIDGE_SCHEDULER.
   * This will remove the group and all schedules within it.
   *
   * @param param0 Object containing the group name.
   * @returns The response from the DeleteScheduleGroupCommand.
   */
  async deleteScheduleGroup({
    name = EVENT_BRIDGE_SCHEDULER.GROUP_NAME.MESSAGE_SCHEDULER,
  }: {
    name: string;
  }) {
    const groupName = name;
    const command = new DeleteScheduleGroupCommand({
      Name: groupName,
    });
    return await this.eventBridge.send(command);
  }
}
