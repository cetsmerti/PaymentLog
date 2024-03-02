import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymantRepository } from './repository/paymanet.repository';
import { CategoryModule } from '../category/category.module';
import { PaymantLogger } from './logging/payment.logger';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), CategoryModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymantRepository, PaymantLogger],
})
export class PaymentModule {}
