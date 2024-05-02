import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    const validPassword = await compare(password, user.password);
    if (validPassword) {
      return await this.generateToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async generateToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '86400s',
        },
      ),
    };
  }
}
