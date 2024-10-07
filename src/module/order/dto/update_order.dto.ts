import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { CreateOrderDto } from './create_order.dto';
import { Type } from 'class-transformer';
import { UpdateOrderProductDto } from './update_order_product.dto';
import { UpdateServiceCarDto } from './update_order_servise_car.dto';
import { UpdateDebtDto } from './update_order_debt.dto';
import { CreateDebtDto } from './create_order_debt.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    type: [UpdateOrderProductDto],
    description: 'Yangilanadigan mahsulotlar',
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderProductDto)
  // @IsOptional()
  products?: UpdateOrderProductDto[];

  @ApiProperty({
    type: () => [UpdateServiceCarDto],
    description: "Yangilanadigan xizmat avtomobili ma'lumotlari",
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceCarDto)
  @IsOptional()
  service_car?: UpdateServiceCarDto[];

  @ApiProperty({
    type: () => [UpdateDebtDto],
    description: 'Yangilanadigan qarzlar',
    // required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDebtDto)
  @IsOptional()
  debts?: UpdateDebtDto[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    type: 'string',
    description:
      "Sotuv tugagandan so'ng statusni o'zgartirish va qarz bo'limiga qo'shish uchun",
    example: 'true',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    type: () => CreateDebtDto, // Lazy type resolvers to prevent circular dependency
    description: 'Qarzlar',
  })
  @Type(() => CreateDebtDto)
  @IsOptional()
  debts?: CreateDebtDto;
}
