import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', allowedHeaders: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  //app.useGlobalGuards(new AtGuard());
  await app.listen(parseInt(process.env.SERVICE_PORT, 10) || 5000);
}
bootstrap();
