import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymantRepository } from './repository/paymanet.repository';
import { FilterQueryDto } from './dto/filter-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly paymantRepository: PaymantRepository) {}
  async create(createPaymentDto: CreatePaymentDto) {
    return await this.paymantRepository.createPayment(createPaymentDto);
  }

  async findAll(filterfQuery: FilterQueryDto) {
    const payments = await this.paymantRepository.findAllPayments(filterfQuery);

    return payments;
  }

  async selectCategory(id: string, categoryIds: string[]) {
    return await this.paymantRepository.selectCategory(id, categoryIds);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymantRepository.updatePayment(id, updatePaymentDto);
  }

  async remove(id: string) {
    return await this.paymantRepository.removePayment(id);
  }
}
