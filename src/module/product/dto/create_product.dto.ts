import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsNumberString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  searchable_title_id: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  current_measurement: string;

  @IsString()
  @IsNotEmpty()
  current_quantity: string;

  @IsString()
  @IsNotEmpty()
  total_measurement: string;

  @IsString()
  @IsNotEmpty()
  total_quantity: string;
}

export class CreateProductSwaggerBodyDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'lesa',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  searchable_title_id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'metr',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '20000',
  })
  @IsNumberString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '110',
  })
  @IsNumberString()
  @IsNotEmpty()
  current_measurement: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '40',
  })
  @IsNumberString()
  @IsNotEmpty()
  current_quantity: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '220',
  })
  @IsNumberString()
  @IsNotEmpty()
  total_measurement: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '200',
  })
  @IsNumberString()
  @IsNotEmpty()
  total_quantity: string;
}
