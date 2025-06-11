import { IsArray, IsString, IsNotEmpty, IsPositive, IsInt, IsOptional } from 'class-validator';
import {
  MailReciever,
  MailSubject,
  MailTemplateName,
  MailContext,
  MailReply,
  MailContentId
} from '@utils/types';
export class MailPayloadDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  mailContentId!: MailContentId;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  to!: MailReciever;

  @IsNotEmpty()
  @IsString()
  subject!: MailSubject;

  @IsNotEmpty()
  @IsString()
  templateName!: MailTemplateName;

  @IsNotEmpty()
  @IsString()
  context!: MailContext;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  replyEmails!: MailReply;
}
