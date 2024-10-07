import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateCarServiceDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  profit_or_expense: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class CreateCarServiceSwaggerBodyDto {
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
    example: 'profit',
  })
  @IsString()
  @IsNotEmpty()
  profit_or_expense: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '123 000',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'yaxshi odamdir',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
