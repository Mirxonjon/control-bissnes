import { ProductServise } from './product.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { GetProductDto } from './dto/get_product.dto';
export declare class ProductsController {
    #private;
    constructor(service: ProductServise);
    findall(query: GetProductDto): Promise<{
        results: import("../../entities/products.entity").ProductsEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<import("../../entities/products.entity").ProductsEntity>;
    create(createProductDto: CreateProductDto): Promise<{
        message: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<void>;
    remove(id: string): Promise<void>;
}
