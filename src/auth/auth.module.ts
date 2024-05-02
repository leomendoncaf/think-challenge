//auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Device]),
    PassportModule,
    JwtModule,
  ],
  providers: [AuthService, UserService, DeviceService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
