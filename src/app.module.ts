import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { configDB } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './config/loger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(loggerConfig),
    TypeOrmModule.forRootAsync(configDB),
    PaymentModule,
    CategoryModule,
  ],
})
export class AppModule {}
