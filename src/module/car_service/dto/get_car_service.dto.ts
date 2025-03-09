import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCarServiceDto {
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

  @ApiProperty({ required: false, example: 'apteka' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  profit_or_expense?: string = 'null';

  @ApiProperty({ required: false, example: 'apteka /number' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  search?: string = 'null';
}

export class GetCarServiseStatistikDto {
  @ApiProperty({ required: false, example: 'true' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  profit_or_expense?: string = 'null';

  @ApiProperty({ required: false, example: 'apteka /number' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  search?: string = 'null';

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
