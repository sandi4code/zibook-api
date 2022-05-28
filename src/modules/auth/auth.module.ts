import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt_secret'),
        signOptions: { expiresIn: '60d' }
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    PassportModule
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
