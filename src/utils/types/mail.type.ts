import { Dayjs } from 'dayjs';

export type MailContentId = number;
export type MailScheduleName = string;
export type MailScheduleGroupName = string;
export type MailScheduleTime = Dayjs;

export type MailReciever = string | string[];
export type MailSubject = string;
export type MailTemplateName = string;
export type MailContext = any;
export type MailReply = string | string[];