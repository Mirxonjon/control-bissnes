import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateOrderProductDto } from './create_order_product.dto';
import { CreateServiceCarDto } from './create_order_servise_car.dto';
import { CreateDebtDto } from './create_order_debt.dto';

export class CreateOrderDto {
  @ApiProperty({
    type: 'string',
    description: 'Foydalanuvchi ID',
    example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    type: 'string',
    description: 'Kunlik narx',
    example: '10000',
  })
  @IsString()
  @IsNotEmpty()
  daily_price: string;

  @ApiProperty({
    type: 'string',
    description: 'Umumiy narx',
    example: '200000',
  })
  @IsString()
  @IsNotEmpty()
  total_price: string;

  @ApiProperty({
    type: 'string',
    description: "To'langan jami summa",
    example: '50000',
  })
  @IsString()
  @IsNotEmpty()
  paid_total: string;

  @ApiProperty({
    type: () => [CreateOrderProductDto],
    description: 'Sotib olingan mahsulotlar',
    examples: [CreateOrderProductDto, CreateOrderProductDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];

  @ApiProperty({
    type: () => [CreateServiceCarDto],
    description: "Xizmat avtomobili ma'lumotlari",
  })
  @ValidateNested({ each: true })
  @Type(() => CreateServiceCarDto)
  service_car: CreateServiceCarDto[];

  // @ApiProperty({
  //   type: () => [CreateDebtDto],
  //   description: 'Qarzlar',
  // })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateDebtDto)
  // @IsOptional()
  // debts: CreateDebtDto[];
  // @ApiProperty({
  //   type: 'string',
  //   description: 'Yaratilgan sana',
  //   example: '2023-09-25T10:00:00Z',
  // })
  // @IsOptional()
  // created_at?: string;
}
