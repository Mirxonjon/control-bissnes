import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetProductDto {
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

    @ApiProperty({ required: false, example: 'lesa', })
    @IsOptional()
    @Type(() => String)
    @IsString()
    searchTitle?: string = 'null' ;

    @ApiProperty({ required: false, example: '123', })
    @IsOptional()
    @Type(() => String)
    @IsString()
    searchable_title_id?: string;

    @ApiProperty({ required: false, example: 'dbcshabfuaowhfowqhf', })
    @IsOptional()
    @Type(() => String)
    @IsString()
    category_id?: string;

}