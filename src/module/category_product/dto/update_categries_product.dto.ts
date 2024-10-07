import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryProductDto {
  @IsString()
  title: string;
}

export class UpdateCategoryProductSwaggerBodyDto {
  @ApiProperty({
    type: 'string',
    required: false, // Optional for update
    example: 'Teatr',
  })
  @IsString()
  @IsOptional()
  title?: string;
}
