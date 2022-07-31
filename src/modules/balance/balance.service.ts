import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>
  ) { }

  async getCurrentBalance(user_id: number): Promise<Balance> {
    return this.balanceRepository.createQueryBuilder('balance')
      .orderBy('created_at', 'DESC')
      .where(`user_id = ${user_id}`)
      .getOne();
  }
}
