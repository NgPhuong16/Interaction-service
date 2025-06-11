import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
import { DATE_FORMAT } from './constants';

export function formatDateTime(
  utcDateString: Dayjs | string,
  formatString: string = DATE_FORMAT.SCHEDULE_FORMAT_RULE,
): string {
  console.log('formatDateTime', utcDateString, formatString);
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

export const currentDay = getCurrentDateTime().format(
  DATE_FORMAT.yyyymmddhhmmss,
);
