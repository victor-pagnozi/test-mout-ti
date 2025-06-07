import { INestApplication } from '@nestjs/common';

export function enableCors(app: INestApplication) {
  const envCors = process.env.CORS_URL;

  if (!envCors) {
    throw new Error(
      'Cors URLs are not defined in the environment variables. Please set CORS_URL.',
    );
  }

  if (envCors === '*') {
    app.enableCors();
    return;
  }

  const corsUrls = envCors.split(',');
  app.enableCors({ origin: corsUrls });
}
