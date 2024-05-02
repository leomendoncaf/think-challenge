import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  local: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: User;
}
