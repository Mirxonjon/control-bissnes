import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateDebtDto {
  @IsString()
  user_id: string;

  @IsString()
  remaining_debt: string;

  @IsString()
  isActive: string;

  @IsString()
  comment: string;

  @IsString()
  dayToBeGiven: string;

  @IsString()
  dayGiven: string;
}

export class UpdateDebtSwaggerBodyDto {
  @ApiProperty({
    type: 'string',
    required: false,
    example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  })
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '123000',
  })
  @IsString()
  @IsOptional()
  remaining_debt?: string;

  @ApiProperty({
    type: 'boolean',
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'yaxshi odamdir',
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    required: false,
    example: '2023-01-01',
  })
  @IsDateString()
  @IsOptional()
  dayToBeGiven?: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    required: false,
    example: '2023-01-01',
  })
  @IsDateString()
  @IsOptional()
  dayGiven?: string;
}
