# Interaction Service - Mail Management System

A serverless email management service built with NestJS that integrates with AWS services (SES, SQS, EventBridge Scheduler) to provide comprehensive email sending, scheduling, and processing capabilities.

## 🏗️ Architecture Overview

This service consists of three main components:

### 1. Mail Provider (Immediate Email Processing)
- **Endpoint**: `POST /mail/immediately`
- **Function**: `mail-provider`
- **Purpose**: Accepts email requests and queues them for immediate processing
- **Flow**: API Gateway → Lambda → SQS Queue

### 2. Mail Consumer (Email Sending)
- **Function**: `mail-consumer`
- **Trigger**: SQS messages
- **Purpose**: Processes queued emails and sends them via AWS SES
- **Features**: Template rendering with Handlebars, status tracking

### 3. Mail Scheduler (Scheduled Email Processing)
- **Endpoints**: 
  - `POST /mail/scheduled` - Create scheduled email
  - `PATCH /mail/scheduled/:mailContentId` - Update schedule
  - `DELETE /mail/scheduled/:mailContentId` - Delete schedule
  - `DELETE /mail/scheduled/batch` - Batch delete schedules
- **Function**: `mail-scheduler`
- **Purpose**: Manages scheduled emails using AWS EventBridge Scheduler
- **Flow**: API Gateway → Lambda → EventBridge Scheduler → Lambda → SQS → SES

## 🚀 AWS Services Integration

### Amazon SES (Simple Email Service)
- Sends emails with HTML content
- Supports reply-to addresses
- Configurable sender email

### Amazon SQS (Simple Queue Service)
- Message queue for email processing
- Batch processing (up to 10 messages)
- 5-second batching window for efficiency

### AWS EventBridge Scheduler
- Schedules emails for future delivery
- One-time execution with flexible time windows
- Integration with Lambda functions

### AWS Lambda
- Serverless compute for all email operations
- Auto-scaling based on demand
- VPC configuration for security

## 📋 Prerequisites

- Node.js 22.x
- AWS Account with appropriate permissions
- Serverless Framework CLI

## 🛠️ Setup & Installation

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd Interaction-service
npm install
```

### 2. Environment Configuration

Create environment files for each stage (`.env.dev`, `.env.stg`, `.env.prod`):

```env
# AWS Configuration
AWS_REGION=ap-northeast-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# SQS Configuration
SQS_QUEUE_URL=https://sqs.ap-northeast-1.amazonaws.com/account/queue-name
SQS_QUEUE_ARN=arn:aws:sqs:ap-northeast-1:account:queue-name

# SES Configuration
SES_SENDER_EMAIL=noreply@yourdomain.com

# Lambda Configuration
LAMBDA_SCHEDULER_ARN=arn:aws:lambda:region:account:function:mail-scheduler
SCHEDULER_ROLE_ARN=arn:aws:iam::account:role/scheduler-role

# API Security
GLOBAL_API_KEY=your-api-key

# Backend Integration
ADMIN_BACKEND_DOMAIN=https://your-backend-domain.com
ADMIN_BACKEND_API_KEY=your-backend-api-key
```

### 3. AWS Resources Setup

The service requires these AWS resources to be created:

- **SQS Queue**: For email message processing
- **IAM Roles**: For Lambda execution and EventBridge Scheduler
- **VPC Configuration**: Security groups and subnets

## 🚀 Deployment

### Development
```bash
npm run start:dev
```

### Serverless Local Development
```bash
npm run start:sls
```

### Production Deployment
```bash
npm run deploy
# or with specific stage
STAGE=prod npm run deploy
```

## 📡 API Endpoints

### Immediate Email Sending

**POST** `/mail/immediately`

Send an email immediately by queuing it for processing.

```json
{
  "mailContentId": 123,
  "to": ["recipient@example.com"],
  "subject": "Your Email Subject",
  "templateName": "mail-marketing",
  "context": {
    "userName": "John Doe",
    "customData": "value"
  },
  "replyEmails": ["support@example.com"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mail enqueued successfully",
  "metadata": {
    "messageId": "sqs-message-id"
  }
}
```

### Scheduled Email Management

#### Create Scheduled Email
**POST** `/mail/scheduled`

```json
{
  "mailContentId": 123,
  "scheduleTime": "2025-09-22T10:00:00Z"
}
```

#### Update Scheduled Email
**PATCH** `/mail/scheduled/:mailContentId`

```json
{
  "scheduleTime": "2025-09-22T15:00:00Z"
}
```

#### Delete Scheduled Email
**DELETE** `/mail/scheduled/:mailContentId`

#### Batch Delete Scheduled Emails
**DELETE** `/mail/scheduled/batch`

```json
{
  "mailContentIdArr": [123, 124, 125]
}
```

## 📧 Email Templates

The service uses Handlebars templates located in `src/modules/mail-consumer/email-render/templates/`:

- `layout.hbs` - Base HTML layout
- `mail-marketing.hbs` - Marketing email template

### Template Structure
```handlebars
{{!-- mail-marketing.hbs --}}
<div class="email-content">
  <h1>{{context.title}}</h1>
  <p>Hello {{context.userName}},</p>
  <p>{{context.message}}</p>
</div>
```

## 🔧 Configuration

### Serverless Configuration
- **Runtime**: Node.js 22.x
- **Timeout**: 29 seconds
- **Memory**: 256 MB
- **VPC**: Configured per environment

### Environment-Specific Settings
- **Development**: `dev` stage with development VPC
- **Staging**: `stg` stage with staging VPC  
- **Production**: `prod` stage with production VPC

## 🏃‍♂️ Development Scripts

```bash
# Development
npm run start:dev          # Start in watch mode
npm run start:sls          # Start serverless offline

# Building
npm run build              # Build the project

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests
npm run test:cov           # Run tests with coverage

# Code Quality
npm run lint               # Lint code
npm run format             # Format code
```

## 📊 Monitoring & Logging

- **CloudWatch Logs**: All Lambda functions log to CloudWatch
- **Error Tracking**: Comprehensive error handling and logging
- **Status Updates**: Mail status tracking through admin backend integration

## 🔒 Security

- **API Key Authentication**: Global API key for endpoint protection
- **VPC Configuration**: Lambda functions run in VPC for security
- **IAM Roles**: Least privilege access for AWS resources
- **Input Validation**: DTO validation using class-validator

## 🚨 Error Handling

The service includes robust error handling:
- **Queue Processing Errors**: Failed messages are logged and can be retried
- **Schedule Validation**: Prevents scheduling emails in the past
- **SES Integration**: Handles email sending failures gracefully
- **Backend Communication**: Manages admin backend API failures

## 📚 Dependencies

### Key Production Dependencies
- **@nestjs/core**: NestJS framework
- **@aws-sdk/client-ses**: AWS SES integration
- **@aws-sdk/client-sqs**: AWS SQS integration  
- **@aws-sdk/client-scheduler**: AWS EventBridge Scheduler
- **handlebars**: Email template engine
- **dayjs**: Date manipulation
- **axios**: HTTP client for backend communication

### Development Dependencies
- **serverless-offline**: Local serverless development
- **typescript**: TypeScript support
- **jest**: Testing framework
- **eslint**: Code linting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED license.
