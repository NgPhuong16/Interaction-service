<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Furusato Tax For Company Mail Service Backend

## Overview

This project is a microservice built with [NestJS](https://nestjs.com/) for handling email delivery, scheduling, and integration with AWS SES, SQS, and EventBridge Scheduler. It is designed to support the Furusato Tax for Company platform, enabling automated and scheduled email communications.

## Features

- **Send Emails Immediately:** Push email jobs to AWS SQS and deliver via AWS SES.
- **Schedule Emails:** Use AWS EventBridge Scheduler to schedule emails for future delivery.
- **Admin Backend Integration:** Fetch email content and recipient lists from an admin backend service.
- **API Key Security:** Secure internal endpoints with API key validation.
- **Serverless Ready:** Deployable to AWS Lambda using the Serverless Framework.

## Project Structure

- `src/modules/mail-provider`: Handles sending emails to SQS.
- `src/modules/mail-scheduler`: Handles scheduling emails via EventBridge Scheduler.
- `src/modules/mail-consumer`: Consumes SQS messages and sends emails via AWS SES.
- `src/helpers`: Utility functions and admin backend API requests.
- `src/utils`: Interfaces, types, and shared utilities.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- AWS account with SES, SQS, and EventBridge Scheduler permissions
- Serverless Framework (for deployment)

### Installation

```bash
npm install
```

### Environment Configuration

Copy `.env.example` to `.env` and update the environment variables to match your setup.

### Running the Project

```bash
# development
npm run build
serverless offline
```

### Serverless Deployment

This project supports deployment to AWS Lambda using the Serverless Framework.

```bash
npm run deploy
```

## Contact

For questions or support, please contact the Furusato technical team.
