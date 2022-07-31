import { Controller, Get, HttpCode, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(
    private balanceService: BalanceService
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  async getCurrentBalance(@Request() req, @Res() res: Response) {
    const currentBalance = await this.balanceService.getCurrentBalance(req.user.user_id);
    res.send({
      balance: currentBalance ?? 0
    });
  }
}
