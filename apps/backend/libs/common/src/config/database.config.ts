import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from './environment';

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: Environment.DB_HOST,
  port: parseInt(Environment.DB_PORT ?? ''),
  username: Environment.DB_USER,
  password: Environment.DB_PASSWORD,
  database: Environment.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
  logging: Environment.NODE_ENV === 'development',
  retryAttempts: 3,
  retryDelay: 3000,
};
