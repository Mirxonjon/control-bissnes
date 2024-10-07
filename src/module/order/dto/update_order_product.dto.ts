import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderProductDto } from './create_order_product.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {
  @ApiProperty({
    type: 'string',
    description: 'order Product ID',
    example: '88dd8fbb-1234-4a4b-9f2f-1cc4b1ff12b8',
  })
  @IsUUID()
  @IsNotEmpty()
  order_product_id: string;

  @ApiProperty({
    type: 'string',
    description: 'Mahsulot ID',
    example: '88dd8fbb-1234-4a4b-9f2f-1cc4b1ff12b8',
  })
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({
    description: 'Bajarilyotgan Amaliyot',
    example: 'Get',
    // required :false
  })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    description: 'Bajarilyotgan Amaliyot',
    example: 'Active',
    // required :false
  })
  @IsString()
  @IsNotEmpty()
  status: string;

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
}
