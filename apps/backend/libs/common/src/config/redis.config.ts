import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { Environment } from './environment';

export const RedisConfig: CacheModuleOptions = {
  store: redisStore,
  host: Environment.REDIS_HOST,
  port: parseInt(Environment.REDIS_PORT ?? '6379'),
  password: Environment.REDIS_PASSWORD,
  ttl: 300,
  max: 100,
};
