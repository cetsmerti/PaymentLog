import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { CustomHttpException } from '../../../exeption/http_error.exeption';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { FilterQueryDto } from '../dto/filter-payment.dto';
import { Injectable } from '@nestjs/common';
import { CategoryService } from '../../category/category.service';

@Injectable()
export class PaymantRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly categoryService: CategoryService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    if (createPaymentDto.categoryIds) {
      payment.categories = await this.getCategorys(
        createPaymentDto.categoryIds,
      );
    }
    return await this.paymentRepository.save(payment);
  }

  async findAllPayments(filterfQuery: FilterQueryDto) {
    const where = {
      description:
        filterfQuery.description && Like(`%${filterfQuery.description}%`),
      createdAt:
        filterfQuery.startDate && filterfQuery.endDate
          ? Between(filterfQuery.startDate, filterfQuery.endDate)
          : (filterfQuery.startDate &&
              MoreThanOrEqual(filterfQuery.startDate)) ||
            (filterfQuery.endDate && LessThanOrEqual(filterfQuery.endDate)),
      deletedAt: null,
    };
    const payments = await this.paymentRepository.find({
      where,
      relations: ['categories'],
    });
    return payments;
  }

  async selectCategory(id: string, categoryIds: string[]) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw CustomHttpException.notFound();
    }
    payment.categories = await this.getCategorys(categoryIds);
    return await this.paymentRepository.save(payment);
  }

  async updatePayment(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!payment) {
      throw CustomHttpException.notFound();
    }
    const updated = Object.assign(payment, updatePaymentDto);

    return await this.paymentRepository.save(updated);
  }

  async removePayment(id: string) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw CustomHttpException.notFound();
    }
    await this.paymentRepository.softDelete(payment.id);
    return payment;
  }
  private async getCategorys(ids: string[]) {
    const categoryArray = [];
    for (const categoryId of ids) {
      const category = await this.categoryService.findOne(categoryId);
      if (!category) {
        throw CustomHttpException.notFound();
      }
      categoryArray.push(category);
    }
    return categoryArray;
  }
}
