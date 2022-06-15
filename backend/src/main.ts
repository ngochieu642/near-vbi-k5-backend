import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import { V1Constants } from './v1/V1Constants';
import { AllExceptionsFilter } from './framework-utils/all-exceptions.filter';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix
  app.setGlobalPrefix(V1Constants.API_PREFIX);

  // Pipe for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Filters
  const httpAdapter = app.get<HttpAdapterHost>(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}

bootstrap()
  .then((_) => {
    logger.log('Bootstrap successfully');
  })
  .catch((e) => {
    logger.warn(e);
  });
