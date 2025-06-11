import { MailContentId, MailScheduleName } from '@utils/types';

export function convertIdToScheduleRuleName(
  mailContentId: MailContentId,
): MailScheduleName {
  return `schedule_queue_send_message_${mailContentId}`;
}
