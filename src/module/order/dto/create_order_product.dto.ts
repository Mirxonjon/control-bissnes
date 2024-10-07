import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @ApiProperty({
    type: 'string',
    description: 'Mahsulot ID',
    example: '88dd8fbb-1234-4a4b-9f2f-1cc4b1ff12b8',
  })
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({
    type: 'string',
    description: "Sotilgan o'lchov",
    example: '110',
  })
  @IsString()
  @IsNotEmpty()
  measurement_sold: string;

  @ApiProperty({
    type: 'string',
    description: 'Sotilgan miqdor',
    example: '20',
  })
  @IsString()
  @IsNotEmpty()
  quantity_sold: string;

  @ApiProperty({
    type: 'string',
    description: 'Kunlik narx',
    example: '50000',
  })
  @IsString()
  @IsNotEmpty()
  price_per_day: string;

  @ApiProperty({
    type: 'string',
    description: 'Foydalanilmagan kunlar',
    example: '5',
  })
  @IsString()
  @IsOptional()
  unused_days?: string;

  @ApiProperty({
    type: 'string',
    description: 'Berilgan sana',
    example: '2023-09-25T10:00:00Z',
  })
  @IsOptional()
  given_date?: string;

  @ApiProperty({
    type: 'string',
    description: 'Tugash sanasi',
    example: '2023-10-01T10:00:00Z',
  })
  @IsOptional()
  end_date?: string;
}
