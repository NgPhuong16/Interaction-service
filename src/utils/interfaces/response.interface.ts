import { HttpStatus } from '@nestjs/common';

export interface ResponseOptions {
  status?: number;
  message?: string;
  statusCode?: HttpStatus;
}

export interface SuccessResponseOptions<T> {
  status?: number;
  message?: string;
  statusCode?: HttpStatus;
  data?: T;
  metadata?: any;
}

export interface FailedResponseOptions<T> {
  status?: number;
  message?: string;
  statusCode?: HttpStatus;
}

export interface MetaDataInterface {
  messageId?: string;
}
