import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BASE_API } from 'const/url';
import { env } from 'helper/env';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
    }),
  );

  app.setGlobalPrefix(`${BASE_API}/${env.VERSION}`);

  await app.listen(env.PORT, '0.0.0.0');
}
bootstrap();
