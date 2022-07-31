import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  controllers: [
    BalanceController,
  ],
  providers: [
    BalanceService,
  ],
})
export class BalanceModule { }
