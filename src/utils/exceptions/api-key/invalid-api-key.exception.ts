import { ForbiddenException } from '@nestjs/common';

export class InvalidApiKeyException extends ForbiddenException {
  constructor(message?: string, options?: string) {
    super(message, options);
  }
}
