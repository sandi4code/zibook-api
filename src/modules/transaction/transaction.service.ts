import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionParams, TransactionSummaryParams } from './transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) { }

  async getTransaction(params: TransactionParams): Promise<Transaction[]> {
    let offset = (params.page * params.limit) - params.limit;
    let sql = `SELECT t.*, c.name AS category_name FROM transactions t LEFT JOIN categories c ON(t.category_id = c.id) WHERE t.user_id=?`;
    if (params.month && params.month != '') {
      sql += ` AND MONTH(date) = ${params.month}`;
    }
    if (params.year && params.year != '') {
      sql += ` AND YEAR(date) = ${params.year}`;
    }
    sql += ` ORDER BY t.created_at DESC`;
    sql += ` LIMIT ${offset}, ${params.limit}`;
    return this.transactionRepository.query(sql, [params.user_id]);
  }

  async getSummary(params: TransactionSummaryParams): Promise<Transaction> {
    let sql = `SELECT SUM(amount) AS amount FROM transactions WHERE user_id = ? AND type = ?`;
    if (params.month && params.month !== null && params.month != '') {
      sql += ` AND MONTH(date) = ${params.month} AND YEAR(date) = ${params.year}`;
    }
    return this.transactionRepository.query(sql, [params.user_id, params.type]);
  }

  async getBalance(userId: number): Promise<Transaction> {
    let sql = `SELECT SUM(amount) AS amount FROM transactions WHERE user_id = ?`;
    return this.transactionRepository.query(sql, [userId]);
  }

  async create(params: Transaction) {
    return this.transactionRepository.insert(params);
  }

  async update(params: Transaction) {
    return (await this.transactionRepository.update({ id: params.id }, params)).affected;
  }

  async delete(id: number|string) {
    return this.transactionRepository.delete(id);
  }
}
