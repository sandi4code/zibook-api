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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isPasswordMatch = await bcrypt.compare(pass, user.password_hash);
    if (user && isPasswordMatch) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      user_id: user.id,
      customer_id: user.customer_id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}