import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    BalanceController,
  ],
  providers: [
    BalanceService,
  ],
})
export class BalanceModule { }
