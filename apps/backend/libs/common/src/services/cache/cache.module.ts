import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { RedisConfig } from '../../config/redis.config';

@Module({
  imports: [NestCacheModule.register(RedisConfig)],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
