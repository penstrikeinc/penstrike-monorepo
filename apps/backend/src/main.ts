import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_HOST_URL,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'HEAD', 'OPTIONS'],
  });

  await app.listen(4000);
}
bootstrap();
