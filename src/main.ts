import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();
  const appPort = configService.get<string>('APP_PORT');

  initApp(app);

  initSwagger(app);

  await app.listen(appPort);

  console.log('App is running:::', await app.getUrl());
}

async function initApp(app: INestApplication) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  app.setGlobalPrefix(PREFIX);
}

async function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nestjs Everything')
    .setDescription('Nestjs everything description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(PREFIX, app, document);
}

bootstrap();
