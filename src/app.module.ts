import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { BalanceModule } from './modules/balance/balance.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UsersModule } from './modules/users/users.module';
import { Balance } from './modules/balance/balance.entity';
import { Category } from './modules/category/category.entity';
import { Transaction } from './modules/transaction/transaction.entity';
import { User } from './modules/users/user.entity';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('db.host') || 'localhost',
        port: config.get('db.port'),
        username: config.get('db.user'),
        password: config.get('db.pass'),
        database: config.get('db.name'),
        entities: [User, Balance, Category, Transaction],
        synchronize: false,
        timezone: "+07:00",
        // debug: (config.get('environment') == 'local') ? true : false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BalanceModule,
    CategoryModule,
    TransactionModule,
    UsersModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
