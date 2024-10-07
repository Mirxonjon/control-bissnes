import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserSwaggerBodyDto {
  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Eshmat',
  })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Eshmat',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Eshmat',
  })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'tanish',
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '+99893348434',
  })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'user',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: string;
}
