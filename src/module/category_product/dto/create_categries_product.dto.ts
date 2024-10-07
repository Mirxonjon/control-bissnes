import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateOrganizationCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class CreateCategoryProductSwaggerBodyDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Apteka',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
