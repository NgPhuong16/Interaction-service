import { BadRequestException, Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { EmailRenderService } from './email-render/email-render.service';
import { appConfig } from '@configs/app.config';
import { MESSAGES, ADMIN_BACKEND_ROUTE, MAIL_STATUS } from '@utils/constants';
import { patchMethodToAdminBackend } from '@helpers/api-request-admin-backend.helper';
import { currentDay } from '@utils/date';
@Injectable()
export class MailConsumerService {
  private sesClient: SESClient;

  constructor(private readonly emailRenderService: EmailRenderService) {
    this.sesClient = new SESClient({
      region: appConfig().AWS_REGION,
    });
  }

  /**
   * Processes an email message by rendering the template and sending the email.
   * @param {any} mailMessage - The mail message containing details like to, subject, templateName, and context.
   * @returns {Promise<void>}
   * @throws {BadRequestException} - If sending the email fails.
   */
  async processEmailMessage({
    queueMessageId,
    mailMessage,
  }: {
    queueMessageId: string;
    mailMessage: any;
  }) {
    const { mailContentId, to, subject, templateName, context, replyEmails } =
      mailMessage;
    console.log(
      'MailConsumerService@processEmailMessage:: mailMessage',
      mailMessage,
    );
    const htmlContent = await this.emailRenderService.renderTemplate(
      templateName,
      { context, subject },
    );
    console.log(
      'MailConsumerService@processEmailMessage:: htmlContent',
      htmlContent,
    );
    const params = {
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlContent,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: appConfig().SES_SENDER_EMAIL,
      ReplyToAddresses: replyEmails,
    };
    console.log(
      'MailConsumerService@processEmailMessage:: params',
      JSON.stringify(params, null, 2),
    );
    try {
      const command = new SendEmailCommand(params);
      console.log(
        'MailConsumerService@processEmailMessage:: command',
        JSON.stringify(command, null, 2),
      );
      const result = await this.sesClient.send(command);
      console.log('MailConsumerService@processEmailMessage:: result', result);
      if (mailContentId) {
        await patchMethodToAdminBackend({
          url: `${ADMIN_BACKEND_ROUTE.UPDATE_MAIL_SENT}/${mailContentId}`,
          data: {
            queue_message_id: queueMessageId,
            send_time: currentDay,
            status: MAIL_STATUS.SENT,
          },
        });
      }
    } catch (err) {
      console.error('MailConsumerService@processEmailMessage:: ', err);
      throw new BadRequestException(MESSAGES.SQS.FAILED_TO_SEND_MESSAGE);
    }
  }
}
