import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetCategoriesProductDto {

    @ApiProperty({ required: false, example: 'apteka', })
    @IsOptional()
    @Type(() => String)
    @IsString()
    title?: string = 'null' ;

    // @ApiProperty({ required: false, example: 'user', })
    // @IsOptional()
    // @Type(() => String)
    // @IsString()
    //     ?: string;

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



}