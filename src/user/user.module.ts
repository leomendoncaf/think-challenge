import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Device } from 'src/device/entities/device.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { DeviceService } from 'src/device/device.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device]), JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, DeviceService, AuthService, JwtStrategy],
  exports:[UserService],
})
export class UserModule {}
