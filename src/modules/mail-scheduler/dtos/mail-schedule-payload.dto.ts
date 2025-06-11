import { IsInt, IsISO8601, IsNotEmpty } from 'class-validator';
import { MailContentId, MailScheduleTime } from '@utils/types/index';
import { IsAfterNow } from '@app/decorators/is-before-now.decorator';

export class MailSchedulePayloadDto {
  @IsInt({ message: 'mailContentId must be an integer' })
  @IsNotEmpty({ message: 'mailContentId is required' })
  mailContentId!: MailContentId;

  @IsISO8601(
    {},
    { message: 'scheduleTime must be a valid ISO 8601 date string' },
  )
  @IsAfterNow()
  @IsNotEmpty({ message: 'scheduleTime is required' })
  scheduleTime!: MailScheduleTime;
}
