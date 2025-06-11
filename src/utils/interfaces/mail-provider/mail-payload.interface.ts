export interface MailPayloadInterface {
  mailContentId: number;
  to: string[];
  subject: string;
  templateName: string;
  context: any;
  replyEmails: string[];
}