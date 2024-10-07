import { CreateOrganizationCategoryDto } from './dto/create_categries_product.dto';
import { UpdateCategoryProductDto } from './dto/update_categries_product.dto';
import { ProductCategoriesEntity } from 'src/entities/product_Categories.entity';
import { GetCategoriesProductDto } from './dto/get_categries_product.dto';
export declare class ProductCategoriesService {
    private logger;
    findAll(query: GetCategoriesProductDto): Promise<{
        results: ProductCategoriesEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<ProductCategoriesEntity>;
    create(body: CreateOrganizationCategoryDto): Promise<void>;
    update(id: string, body: UpdateCategoryProductDto): Promise<void>;
    delete(id: string): Promise<void>;
}
