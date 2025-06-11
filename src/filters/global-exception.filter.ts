import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MESSAGES } from '../utils/constants';
import { getRequestId } from '../utils/serverless-request';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = MESSAGES.GLOBAL;

    console.error('GlobalExceptionsFilter@catch:', exception);

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const exceptionResponse = exception.getResponse();

      // Handle BadRequestException with validation errors
      if (statusCode === HttpStatus.BAD_REQUEST && typeof exceptionResponse === 'object') {
        // Extract the message array or string from the response
        message = (exceptionResponse as any).message || exception.message;
      } else {
        message = exception.message;
      }
    }

    response.status(statusCode).json({
      statusCode,
      message,
      requestId: getRequestId(),
    });
  }
}