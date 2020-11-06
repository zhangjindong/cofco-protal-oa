import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apps = app.get(AppService);
  console.dir(apps.getHello());

  await app.listen(3000);
}
bootstrap();
