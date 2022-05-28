import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { Public } from './modules/auth/skip-auth';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
