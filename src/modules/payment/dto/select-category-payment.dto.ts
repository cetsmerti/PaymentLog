import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SelectCategoryPaymentDto {
  @ApiProperty({ description: 'Category ids' })
  @IsArray()
  categoryIds?: string[];
}
