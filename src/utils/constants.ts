import { appConfig } from '@configs/app.config';

export const MESSAGES = {
  GLOBAL:
    'An unexpected error occurred. Please try again later or contact support if the issue persists.',
  API_KEY: {
    INVALID: 'Invalid or missing API key',
  },
  SQS: {
    FAILED_TO_SEND_MESSAGE: 'Failed to send message to SQS',
  },
  SCHEDULER: {
    SCHEDULE_TIME_IN_PAST: 'Schedule time cannot be in the past',
  },
};

export const DATE_FORMAT = {
  SCHEDULE_FORMAT_RULE: 'YYYY-MM-DDTHH:mm:ss',
  yyyymmddhhmmss: 'YYYY-MM-DD HH:mm:ss',
};

export const TIME_ZONE = {
  UTC: 'UTC',
  TOKYO: 'Asia/Tokyo',
};

export const EVENT_BRIDGE_SCHEDULER = {
  GROUP_NAME: {
    MESSAGE_SCHEDULER: 'schedule_queue_send_message',
  },
};

export const INTERACTION_SERVICE_PREFIX = 'interaction-service';
export const ADMIN_BACKEND_URL = `${appConfig().ADMIN_BACKEND_DOMAIN}/${INTERACTION_SERVICE_PREFIX}`;
export const ADMIN_BACKEND_ROUTE = {
  MAIL_DETAIL: `${ADMIN_BACKEND_URL}`,
  UPDATE_MAIL_SENT: `${ADMIN_BACKEND_URL}`,
};

export const MAIL_STATUS = {
  NOT_SENT: 0,
  SENT: 1,
};
