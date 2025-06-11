import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InvalidApiKeyException } from '../utils/exceptions/api-key/invalid-api-key.exception';
import { MESSAGES } from '../utils/constants';
import { appConfig } from '../configs/app.config';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const expectedKey = appConfig().GLOBAL_API_KEY;

    if (!apiKey || apiKey !== expectedKey) {
      throw new InvalidApiKeyException(MESSAGES.API_KEY.INVALID);
    }

    next();
  }
}
