import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HasherModule } from '@app/common/services/hasher/hasher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/common/models/user';
import { SigninService } from './services/signin.service';

@Module({
  imports: [HasherModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [SigninService],
})
export class AuthModule {}
