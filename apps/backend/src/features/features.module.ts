import { Module } from '@nestjs/common';
import { UserManagementModule } from './user-management/user-management.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserManagementModule, AuthModule],
})
export class FeaturesModule {}
