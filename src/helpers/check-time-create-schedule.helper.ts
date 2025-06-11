
import { getCurrentDateTime, toDate } from '@utils/date';
import { Dayjs } from 'dayjs';

export function isScheduleTimeBeforeToday(scheduleTime: Dayjs): boolean {
  const scheduleDate = toDate(scheduleTime);
  const currentDate = getCurrentDateTime();
  return scheduleDate.valueOf() < currentDate.valueOf();
}