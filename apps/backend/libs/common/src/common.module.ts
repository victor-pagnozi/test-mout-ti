import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class CommonModule {}
