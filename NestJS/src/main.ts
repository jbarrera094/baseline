import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api/COL');
  await app.listen(AppModule.port);
}
bootstrap();
