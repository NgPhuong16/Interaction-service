import { Controller, Get, Res } from '@nestjs/common';
import { SuccessResponse } from './utils/response';
import { Response } from 'express';
@Controller()
export class AppController {
  @Get('/health-check')
  async check(@Res() res: Response) {
    return new SuccessResponse({
      message: 'Health check success',
    }).send(res);
  }
}
