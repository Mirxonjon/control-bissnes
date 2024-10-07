import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDebtDto } from './create_order_debt.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {
  @ApiProperty({
    description: 'Bajarilyotgan Amaliyot',
    example: 'Get',
    // required :false
  })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    description: 'Aktivligi',
    example: 'true',
  })
  @IsString()
  @IsNotEmpty()
  isActive: string;

  @ApiProperty({
    description: 'Qolgan qarz miqdori',
    example: '123000',
    // required :false
  })
  @IsString()
  @IsNotEmpty()
  remaining_debt: string;
  @ApiProperty({
    description: 'Qarz beriladigan kun',
    example: '2023-01-01T00:00:00Z',
  })
  @IsString()
  @IsNotEmpty()
  dayToBeGiven: string;

  @ApiProperty({
    description: 'Qarz berilgan kun',
    example: '2023-01-01T00:00:00Z',
  })
  @IsString()
  @IsNotEmpty()
  dayGiven: string;
}
