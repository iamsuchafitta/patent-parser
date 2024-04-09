import '@total-typescript/ts-reset';
import { NestFactory } from '@nestjs/core';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { AppModule } from './app.module.js';
import { AppConfig } from './common/app-config.js';
import './common/dayjs-configured.js';
import './types/types.js';

async function bootstrap() {
  puppeteer.default.use(StealthPlugin());
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      origin: true,
      credentials: true,
    },
  });
  await app.enableShutdownHooks().listen(AppConfig.port);
  console.log(`App is successfully launched on port ${AppConfig.port}`);
}

bootstrap();
