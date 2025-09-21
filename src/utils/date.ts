import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

import { DATE_FORMAT, TIME_ZONE } from './constants';

export function formatDateTime(
  utcDateString: Dayjs | string,
  formatString: string = DATE_FORMAT.SCHEDULE_FORMAT_RULE,
): string {
  return dayjs.utc(utcDateString).format(formatString);
}

export function toDate(input: string | number | Dayjs): Dayjs {
  if (dayjs.isDayjs(input)) return input;
  return dayjs(input);
}

// Local timezone
export function getCurrentDateTime(): Dayjs {
  return dayjs();
}

export function getDateAtTZ({
  date,
  timeZone,
}: {
  date: Dayjs;
  timeZone?: string;
}): Dayjs {
  return date.tz(timeZone);
}

export function formatDate({
  date,
  formatType,
}: {
  date: Dayjs;
  formatType?: string;
}): string {
  return date.format(formatType);
}
