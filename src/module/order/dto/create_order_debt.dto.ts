import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateDebtDto {
  // @ApiProperty({
  //   description: 'Foydalanuvchi ID',
  //   example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  // })
  // @IsUUID()
  // @IsNotEmpty()
  // user_id: string;

  @ApiProperty({
    description: 'Qolgan qarz miqdori',
    example: '123000',
    // required :false
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  remaining_debt: string;

  @ApiProperty({
    description: 'Izoh',
    example: "O'z vaqtida to'lanishi kerak",
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    description: 'Aktivligi',
    example: 'true',
  })
  @IsString()
  @IsNotEmpty()
  isActive: string;

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
