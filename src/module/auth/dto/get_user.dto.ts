import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetUserDto {
    @ApiProperty({ required: false, example: 1, })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageNumber?: number;
  
    @ApiProperty({ required: false, example: 10, })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageSize?: number;

    @ApiProperty({ required: false, example: '+99893843484', })
    @IsOptional()
    @Type(() => String)
    @IsString()
    phone?: string = 'null' ;

    @ApiProperty({ required: false, example: 'user', })
    @IsOptional()
    @Type(() => String)
    @IsString()
    role?: string;

}