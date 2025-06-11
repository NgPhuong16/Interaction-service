import {
  MailContentId,
  MailScheduleGroupName,
  MailScheduleTime,
  MailContext,
  MailSubject,
  MailTemplateName,
  MailScheduleName,
} from '@utils/types/mail.type';

export interface MailSchedulerCreatePayloadInterface {
  mailContentId: MailContentId;
  scheduleTime: MailScheduleTime;
  scheduleGroupName: MailScheduleGroupName;
}

export interface MailSchedulerUpdatePayloadInterface {
  mailContentId: MailContentId;
  scheduleTime: MailScheduleTime;
  scheduleGroupName: MailScheduleGroupName;
}

export interface MailSchedulerDeletePayloadInterface {
  mailContentId: MailContentId;
  scheduleGroupName: MailScheduleGroupName;
}

export interface MailSchedulerDeleteBatchPayloadInterface {
  mailContentIdArr: MailContentId[];
  scheduleGroupName: MailScheduleGroupName;
}
