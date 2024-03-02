import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FilterQueryDto } from './dto/filter-payment.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CustomHttpException } from '../../exeption/http_error.exeption';
import { SelectCategoryPaymentDto } from './dto/select-category-payment.dto';
import { PaymantLogger } from './logging/payment.logger';
import { PaymentLogTransaction } from './types/payment_log_transaction.enum';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly loggerPayment: PaymantLogger,
  ) {}

  @ApiBody({ type: CreatePaymentDto })
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.create(createPaymentDto);
    this.loggerPayment.info(PaymentLogTransaction.CREATE, payment);
    return payment;
  }

  @Get()
  async findAll(@Query() filterfQuery: FilterQueryDto) {
    return this.paymentService.findAll(filterfQuery);
  }

  @ApiBody({ type: SelectCategoryPaymentDto })
  @Post('select-category/:id')
  async selectCategory(
    @Param('id') id: string,
    @Body() body: SelectCategoryPaymentDto,
  ) {
    if (!id) {
      throw CustomHttpException.badRequest();
    }
    return this.paymentService.selectCategory(id, body.categoryIds);
  }

  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreatePaymentDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    if (!id) {
      throw CustomHttpException.badRequest();
    }
    const payment = await this.paymentService.update(id, updatePaymentDto);

    this.loggerPayment.info(PaymentLogTransaction.UPDATE, payment);

    return payment;
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw CustomHttpException.badRequest();
    }
    const paymanet = await this.paymentService.remove(id);
    this.loggerPayment.info(PaymentLogTransaction.DELETE, paymanet);
    return {
      message: 'Payment delete successfully',
    };
  }
}
