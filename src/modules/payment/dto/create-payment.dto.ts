import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaymantType } from '../types/category_type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ enum: PaymantType, description: 'Income or Expense' })
  @IsEnum(PaymantType)
  @IsOptional()
  type?: PaymantType;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000000)
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  categoryIds?: string[];
}
