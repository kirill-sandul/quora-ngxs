import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from './config/default';
import * as cookie_parser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    origin: [ 'http://localhost:4200' ]
  });
  app.use(cookie_parser());
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT || config.port);
}
bootstrap();
