import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductsEntity } from 'src/entities/products.entity';
import { GetProductDto } from './dto/get_product.dto';
export declare class ProductServise {
    private logger;
    findAll(query: GetProductDto): Promise<{
        results: ProductsEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<ProductsEntity>;
    create(body: CreateProductDto): Promise<{
        message: string;
    }>;
    update(id: string, body: UpdateProductDto): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
}
