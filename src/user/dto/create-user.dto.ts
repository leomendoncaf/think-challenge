import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Entre com um email válido.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres.' })
  password: string;
}
