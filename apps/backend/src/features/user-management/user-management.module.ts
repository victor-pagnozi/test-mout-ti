import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/common/models/user';
import { UserManagementController } from './user-management.controller';
import {
  UserCreatorService,
  UserEraserService,
  UserFinderService,
  UserUpdaterService,
} from './services';
import { HasherModule } from '@app/common/services/hasher/hasher.module';
import { CacheModule } from '@app/common/services/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HasherModule, CacheModule],
  controllers: [UserManagementController],
  providers: [
    UserCreatorService,
    UserFinderService,
    UserUpdaterService,
    UserEraserService,
  ],
  exports: [
    UserCreatorService,
    UserFinderService,
    UserUpdaterService,
    UserEraserService,
  ],
})
export class UserManagementModule {}
