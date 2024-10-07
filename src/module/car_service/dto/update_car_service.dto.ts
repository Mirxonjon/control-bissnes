import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateCarServiceDto {
  @IsString()
  user_id: string;

  @IsString()
  profit_or_expense: string;

  @IsString()
  price: string;

  @IsString()
  comment: string;
}

export class UpdateCarServiceSwaggerBodyDto {
  @ApiProperty({
    type: 'string',
    required: false, // Optional because it's an update DTO
    example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  })
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'profit',
  })
  @IsString()
  @IsOptional()
  profit_or_expense?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '123 000',
  })
  @IsString()
  @IsOptional()
  price?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'yaxshi odamdir',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
