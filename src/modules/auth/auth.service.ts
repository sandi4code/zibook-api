import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(phone: string): Promise<any> {
    const user = await this.usersService.findOne(phone);
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async validatePassword(pass: string, password_hash: string): Promise<any> {
    const isPasswordMatch = await bcrypt.compare(pass, password_hash);
    return isPasswordMatch;
  }

  async login(user: any) {
    const payload = {
      user_id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async register(data: any) {
    data.password = await bcrypt.hash(data.password, 10);
    const register = await this.usersService.create(data);
    return register;
  }
}