import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@app/common/config/database.config';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
