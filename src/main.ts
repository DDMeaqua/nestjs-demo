import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'XiaoMan',
      name: '__sid__',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  await app.listen(3000);
}
bootstrap();
