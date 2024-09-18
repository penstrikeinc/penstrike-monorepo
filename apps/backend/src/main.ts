import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_HOST_URL,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'HEAD', 'OPTIONS'],
  });
  await app.listen(4000);
}
bootstrap();
