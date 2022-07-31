import { Controller, Delete, Get, HttpCode, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private transactionService: TransactionService
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  async getTransaction(@Request() req, @Res() res: Response) {
    let params = {
      user_id: req.user.user_id,
      page: req.query.page ?? 1,
      limit: req.query.limit ?? 10,
      month: req.query.month ?? null,
      year: req.query.year ?? null
    };
    let result = await this.transactionService.getTransaction(params);
    res.send(result);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('summary')
  async getSummary(@Request() req, @Res() res: Response) {
    let params = {
      user_id: req.user.user_id,
      type: 'income',
      month: req.query.month ?? null,
      year: req.query.year ?? null
    };
    let income = await this.transactionService.getSummary(params);

    params.type = 'expense';
    let expense = await this.transactionService.getSummary(params);
    res.send({
      income: income ? income[0]?.amount : 0,
      expense: expense ? expense[0]?.amount : 0,
    });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post()
  async create(@Request() req, @Res() res: Response) {
    let params: Transaction = {
      user_id: req.user.user_id,
      type: req.body.type,
      amount: Number(req.body.amount),
      date: req.body.date,
      category_id: req.body.category_id,
      description: req.body.description,
      id: null,
      debt_id: null,
      credit_id: null,
      created_at: new Date().toDateString(),
      updated_at: null
    };

    if (params.type == 'expense') {
      params.amount = 0 - params.amount;
    }

    this.transactionService.create(params).then((result) => {
      res.send(result);
    }).catch(() => {
      res.statusMessage = 'Failed';
      res.sendStatus(400);
    });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Put()
  async update(@Request() req, @Res() res: Response) {
    let params: Transaction = {
      user_id: req.user.user_id,
      id: req.body.id,
      type: req.body.type,
      amount: req.body.amount,
      date: req.body.date,
      category_id: req.body.category_id,
      description: req.body.description,
      credit_id: null,
      debt_id: null,
      created_at: null,
      updated_at: null
    };
    let save = await this.transactionService.update(params);
    res.send(save);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  async delete(@Request() req, @Res() res: Response) {
    let id = req.params.id;
    this.transactionService.delete(id).then((result) => {
      res.send(result);
    }).catch(() => {
      res.sendStatus(400);
    });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('balance')
  async getBalance(@Request() req, @Res() res: Response) {
    let userId = req.user.user_id;
    let result = await this.transactionService.getBalance(userId);
    res.send({
      amount: result ? result[0]?.amount : 0
    });
  }
}
