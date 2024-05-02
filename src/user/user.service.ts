import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    //const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, 8);
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.password = await bcrypt.hash(updateUserDto.password, 8);
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
