import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export function setupMiddleware(app: INestApplication) {
  const expressApp = app as NestExpressApplication;

  expressApp.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'none'"],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      xssFilter: true,
      noSniff: true,
      hidePoweredBy: true,
      frameguard: { action: 'deny' },
    }),
  );

  expressApp.use(bodyParser.json({ limit: '2048mb' }));
  expressApp.use(bodyParser.urlencoded({ limit: '2048mb', extended: true }));
}

export async function createAppInstance() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose', 'fatal'],
    bufferLogs: true,
  });
  setupMiddleware(app);
  return app;
}
