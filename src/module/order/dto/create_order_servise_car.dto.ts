import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateServiceCarDto {
  @ApiProperty({
    type: 'string',
    description: 'Narx',
    example: '15000',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    type: 'string',
    description: 'Izoh',
    example: 'Yangi xizmat',
  })
  @IsString()
  @IsNotEmpty()
  comment?: string;
}
