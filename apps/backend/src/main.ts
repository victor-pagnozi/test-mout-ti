import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@app/common/functions/setupSwagger';
import { enableCors } from '@app/common/functions/enableCors';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { Environment } from '@app/common/config/environment';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  enableCors(app);

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  const port = Environment.PORT ?? 3001;

  logger.log(`Starting server on port ${port}`);

  await app.listen(port);

  logger.log(`Server running on http://0.0.0.0:${port}`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during application startup:', err);
  process.exit(1);
});
