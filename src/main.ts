import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './log/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
