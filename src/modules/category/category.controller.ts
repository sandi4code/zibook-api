import { Controller, Get, HttpCode, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  async getCurrentCategory(@Request() req, @Res() res: Response) {
    let result = await this.categoryService.getCategory();
    res.send(result);
  }
}
