import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class FilterQueryDto {
  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  endDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
