import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceCarDto } from './create_order_servise_car.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateServiceCarDto extends PartialType(CreateServiceCarDto) {
  @ApiProperty({
    type: 'string',
    description: 'order Product ID',
    example: '88dd8fbb-1234-4a4b-9f2f-1cc4b1ff12b8',
  })
  @IsUUID()
  @IsNotEmpty()
  service_car_id: string;
  @ApiProperty({
    description: 'Bajarilyotgan Amaliyot',
    example: 'Get',
    // required :false
  })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    type: 'string',
    description: 'Narx',
    example: '15000',
  })
  @IsString()
  @IsNotEmpty()
  price: string;
}
