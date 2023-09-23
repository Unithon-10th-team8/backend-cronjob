import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  Logger.log('Starting application...', 'Bootstrap');

  const appContext = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });
  const appService = appContext.get(AppService);

  try {
    await appService.sendEmail();
  } catch (error) {
    Logger.error(error.message, '', 'Bootstrap');
    process.exit(1);
  } finally {
    process.exit(0);
  }
}
bootstrap();
