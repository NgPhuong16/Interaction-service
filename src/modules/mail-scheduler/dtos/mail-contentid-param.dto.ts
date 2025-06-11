import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { MailContentId } from '@utils/types';

export class MailContentIdParamDto {
  constructor(){
    console.log('MailContentIdParamDto test')
  }
  @Type(() => Number)
  @IsNotEmpty({ message: 'mailContentId is required' })
  @IsInt({ message: 'mailContentId must be an integer' })
  @IsPositive({
    message: 'mailContentId must be a positive number and greater than 0',
  })
  mailContentId!: MailContentId;
}
