import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetOrderDto {
  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageNumber?: number;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  @ApiProperty({ required: false, example: 'true' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  isActive?: string = 'null';

  @ApiProperty({ required: false, example: '+99893843484' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  nomer?: string = 'null';

  @ApiProperty({ required: false, example: 'Eshmat' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  name?: string = 'null';

  @ApiProperty({ required: false, example: '2023-01-01' })
  @IsOptional()
  //   @Type(() => Date)
  @IsString()
  startDate?: string = 'null';

  @ApiProperty({ required: false, example: '2024-01-01' })
  @IsOptional()
  //   @Type(() => Date)
  @IsString()
  endDate?: string = 'null';
}

export class GetStatistikDto {
  @ApiProperty({ required: false, example: 'true' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  isActive?: string = 'null';

  @ApiProperty({ required: false, example: '2023-01-01' })
  @IsOptional()
  //   @Type(() => Date)
  @IsString()
  startDate?: string = 'null';

  @ApiProperty({ required: false, example: '2024-01-01' })
  @IsOptional()
  //   @Type(() => Date)
  @IsString()
  endDate?: string = 'null';

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageNumber?: number;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;
}
