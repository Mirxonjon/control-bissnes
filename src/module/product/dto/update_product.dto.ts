import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumberString,
  IsUUID,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    type: 'string',
    required: false,
    example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  })
  @IsUUID()
  @IsOptional()
  category_id?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'lesa',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '123',
  })
  @IsString()
  @IsOptional()
  searchable_title_id?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'metr',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '20000',
  })
  @IsNumberString()
  @IsOptional()
  price?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '110',
  })
  @IsNumberString()
  @IsOptional()
  current_measurement?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '40',
  })
  @IsNumberString()
  @IsOptional()
  current_quantity?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '220',
  })
  @IsNumberString()
  @IsOptional()
  total_measurement?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '200',
  })
  @IsNumberString()
  @IsOptional()
  total_quantity?: string;
}

export class UpdateProductSwaggerBodyDto {
  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  // })
  // @IsUUID()
  // @IsOptional()
  // category_id?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: 'lesa',
  // })
  // @IsString()
  // @IsOptional()
  // title?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: '123',
  // })
  // @IsString()
  // @IsOptional()
  // searchable_title_id?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: 'metr',
  // })
  // @IsString()
  // @IsOptional()
  // type?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: '20000',
  // })
  // @IsNumberString()
  // @IsOptional()
  // price?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: '110',
  // })
  // @IsNumberString()
  // @IsOptional()
  // current_measurement?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: '40',
  // })
  // @IsNumberString()
  // @IsOptional()
  // current_quantity?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: '220',
  // })
  // @IsNumberString()
  // @IsOptional()
  // total_measurement?: string;

  // @ApiProperty({
  //   type: 'string',
  //   required: false,
  //   example: '200',
  // })
  // @IsNumberString()
  // @IsOptional()
  // total_quantity?: string;
}
