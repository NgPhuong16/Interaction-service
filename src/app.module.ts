import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MailProviderModule } from './modules/mail-provider/mail-provider.module';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { GlobalExceptionsFilter } from './filters/global-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { MailSchedulerModule } from './modules/mail-scheduler/mail-scheduler.module';
@Module({
  imports: [MailProviderModule, MailSchedulerModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
