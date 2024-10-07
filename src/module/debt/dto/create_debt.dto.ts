import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateDebtDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  remaining_debt: string;

  @IsString()
  @IsNotEmpty()
  isActive: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  dayToBeGiven: string;

  @IsString()
  @IsNotEmpty()
  dayGiven: string;
}

export class CreateDebtSwaggerBodyDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '123000',
  })
  @IsString()
  @IsNotEmpty()
  remaining_debt: string;

  @ApiProperty({
    type: 'boolean',
    required: true,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'yaxshi odamdir',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    required: true,
    example: '2023-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  dayToBeGiven: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    required: true,
    example: '2023-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  dayGiven: string;
}
