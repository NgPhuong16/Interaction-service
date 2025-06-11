/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { getRequestId } from './serverless-request';
import { FailedResponseOptions, MetaDataInterface, ResponseOptions, SuccessResponseOptions } from './interfaces/response.interface';

enum Status {
  OK = 1,
  ERROR = 0,
}

class ResponseFactory {
  public status: number;
  public statusCode: HttpStatus;
  public message?: string;

  constructor({
    status = Status.OK,
    statusCode = HttpStatus.OK,
    message,
  }: ResponseOptions) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
  }

  public send(res: ExpressResponse): any {
    return res.status(this.statusCode).json({
      ...this,
      requestId: getRequestId(),
    });
  }
}

class SuccessResponse<T> extends ResponseFactory {
  public data?: T;
  public metadata?: MetaDataInterface | any;
  constructor({
    status = Status.OK,
    statusCode = HttpStatus.OK,
    message,
    data,
    metadata
  }: SuccessResponseOptions<T>) {
    super({ message, status, statusCode });
    this.data = data;
    this.metadata = metadata;
  }
}

class FailedResponse<T> extends ResponseFactory {
  public data?: T;

  constructor({
    status = Status.ERROR,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }: FailedResponseOptions<T>) {
    super({ message, status, statusCode });
  }
}

export { SuccessResponse, FailedResponse };
