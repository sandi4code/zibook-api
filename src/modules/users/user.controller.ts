import { Controller, Get, HttpCode, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  async getUser(@Request() req, @Res() res: Response) {
    const user = await this.userService.findById(req.user.user_id);
    res.send(user);
  }
}
