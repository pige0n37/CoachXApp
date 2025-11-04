import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: true,
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
