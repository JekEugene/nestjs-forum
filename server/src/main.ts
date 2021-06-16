import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv'
import { NestExpressApplication } from '@nestjs/platform-express';

async function start() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = 4000
  app.use(cookieParser())
  const cors = {
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(cors);

  config()
  await app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`)
  });
}
start();
