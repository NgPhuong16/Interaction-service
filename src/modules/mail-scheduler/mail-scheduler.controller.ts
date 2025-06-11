import {
  Controller,
  Post,
  Body,
  Res,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { SuccessResponse } from '@utils/response';
import {
  MailSchedulePayloadDto,
  MailScheduleUpdatePayloadDto,
  MailContentIdParamDto,
  MailScheduleDeleteBatchDto,
} from './dtos';
import { MailSchedulerService } from './mail-scheduler.service';
import { EVENT_BRIDGE_SCHEDULER } from '@utils/constants';
import { MailScheduleGroupName } from '@utils/types';

@Controller('mail/scheduled')
export class MailSchedulerController {
  private readonly scheduleGroupName: MailScheduleGroupName;
  constructor(private readonly mailService: MailSchedulerService) {
    this.scheduleGroupName =
      EVENT_BRIDGE_SCHEDULER.GROUP_NAME.MESSAGE_SCHEDULER;
  }

  @Post('/')
  async create(
    @Body() mailSchedule: MailSchedulePayloadDto,
    @Res() res: Response,
  ) {
    const { mailContentId, scheduleTime } = mailSchedule;
    const { scheduleName } =
      await this.mailService.createScheduleSendMessageToQueue({
        mailContentId,
        scheduleTime,
        scheduleGroupName: this.scheduleGroupName,
      });
    return new SuccessResponse({
      message: 'Set mail enqueued successfully',
      metadata: {
        scheduleName,
        scheduleGroupName: this.scheduleGroupName,
      },
    }).send(res);
  }

  @Patch('/:mailContentId')
  async patch(
    @Param()
    param: MailContentIdParamDto,
    @Body()
    payload: MailScheduleUpdatePayloadDto,
    @Res() res: Response,
  ) {
    const { message } = await this.mailService.updateScheduleSendMessageToQueue(
      {
        mailContentId: param.mailContentId,
        scheduleTime: payload.scheduleTime,
        scheduleGroupName: this.scheduleGroupName,
      },
    );
    return new SuccessResponse({
      message,
    }).send(res);
  }

  @Delete('/batch')
  async deleteBatch(
    @Body() payload: MailScheduleDeleteBatchDto,
    @Res() res: Response,
  ) {
    await this.mailService.deleteBatchScheduleSendMessageToQueue({
      mailContentIdArr: payload.mailContentIdArr,
      scheduleGroupName: this.scheduleGroupName,
    });
    return new SuccessResponse({
      message: 'Delete batch success',
    }).send(res);
  }

  @Delete('/:mailContentId')
  async delete(
    @Param()
    param: MailContentIdParamDto,
    @Res() res: Response,
  ) {
    console.log(
      'MailSchedulerController@deleteMailSchedule:: mailContentId',
      param.mailContentId,
      typeof param.mailContentId,
    );
    const { message } = await this.mailService.deleteScheduleSendMessageToQueue(
      {
        mailContentId: param.mailContentId,
        scheduleGroupName: this.scheduleGroupName,
      },
    );
    return new SuccessResponse({
      message,
    }).send(res);
  }
}
