import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';
import { MailContentId } from '@utils/types/index';

export class MailScheduleDeleteBatchDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  mailContentIdArr!: MailContentId[];
}
