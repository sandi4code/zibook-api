import { BadRequestException, Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './skip-auth';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    let { phone, password } = req.body;
    const user = await this.authService.validateUser(phone);
    if (user) {
      const validatePassword = await this.authService.validatePassword(password, user.password);
      if (validatePassword) {
        const token = await this.authService.login(user);
        res.send({
          token,
          name: user.name,
          phone: user.phone
        });
      } else {
        throw new UnauthorizedException('Password tidak sesuai, silahkan coba kembali.');
      }
    } else {
      throw new UnauthorizedException('Nomor handphone tidak terdaftar.');
    }
  }

  @Public()
  @Post('register')
  async register(@Req() req: Request) {
    let { name, phone, email, password } = req.body;
    const checkPhone = await this.authService.validateUser(phone);
    if (!checkPhone) {
      const register = await this.authService.register({
        name, phone, email, password
      });
      if (register) {
        throw new HttpException('Pendaftaran berhasil', HttpStatus.CREATED);
      } else {
        throw new BadRequestException('Pendaftaran gagal.');
      }
    } else {
      throw new BadRequestException('Nomor handphone sudah terdaftar.');
    }
  }
}
