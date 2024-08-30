import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './common/middlewares/logger.middleware';
import { IsUUIDPipe } from './common/pipes/isUUID.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  app.useGlobalPipes(new IsUUIDPipe());
  console.log(`Server running on port http://localhost:${3000}`);
  await app.listen(3000);
}
bootstrap();
