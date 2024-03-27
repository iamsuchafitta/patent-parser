import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './common/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.enableShutdownHooks().listen(AppConfig.port);
  console.log(`App is successfully launched on port ${AppConfig.port}`);
}

bootstrap();
