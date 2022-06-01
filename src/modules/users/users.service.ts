import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(phone: string): Promise<User> {
    return this.usersRepository.findOne({ phone: phone });
  }

  async create(data: any): Promise<User> {
    let user = new User();
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.password = data.password;
    return await this.usersRepository.save(user);
  }
}