export const appConfig = () => {
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    AWS_REGION: process.env.AWS_REGION || 'ap-northeast-1',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    SQS_QUEUE_URL: process.env.SQS_QUEUE_URL || '',
    SES_SENDER_EMAIL: process.env.SES_SENDER_EMAIL || '',
    SQS_QUEUE_ARN: process.env.SQS_QUEUE_ARN || '',
    GLOBAL_API_KEY: process.env.GLOBAL_API_KEY || '',
    LAMBDA_SCHEDULER_ARN: process.env.LAMBDA_SCHEDULER_ARN || '',
    SCHEDULER_ROLE_ARN: process.env.SCHEDULER_ROLE_ARN || '',
    ADMIN_BACKEND_DOMAIN: process.env.ADMIN_BACKEND_DOMAIN || '',
    ADMIN_BACKEND_API_KEY: process.env.ADMIN_BACKEND_API_KEY || '',
  };
};
