import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { PaymentLogTransaction } from '../types/payment_log_transaction.enum';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymantLogger {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async info(
    typeLog: PaymentLogTransaction,
    { amount, createdAt, type, categories }: Payment,
  ) {
    const categoriesToString =
      categories && categories?.map((category) => category.id).join(', ');
    this.logger.info(
      `Type: ${typeLog} ; TypePayment: ${type} ; Amount: ${amount} ; CreatedAt: ${createdAt} ; Categories: ${categoriesToString || ''}`,
    );
  }
}
