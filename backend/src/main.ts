import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { V1Constants } from './v1/V1Constants';
import { AllExceptionsFilter } from './framework-utils/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('main');

export function appExtensions(app: INestApplication) {
  // Pipe for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Filters
  const httpAdapter = app.get<HttpAdapterHost>(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Swaggers
  const config = new DocumentBuilder()
    .setTitle('Identity App')
    .setDescription('Blockchain Identity App')
    .setVersion('1.0')
    .addTag('blockchain')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);
}

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, { cors: { origin: '*' } });

  // Prefix
  app.setGlobalPrefix(V1Constants.API_PREFIX);

  appExtensions(app);

  await app.listen(3000);
}

bootstrap()
  .then((_) => {
    logger.log('Bootstrap successfully');
  })
  .catch((e) => {
    logger.warn(e);
  });
