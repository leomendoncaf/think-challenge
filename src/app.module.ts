import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { DeviceModule } from './device/device.module';
import { Device } from './device/entities/device.entity';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      entities: [User, Device],
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    DeviceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
