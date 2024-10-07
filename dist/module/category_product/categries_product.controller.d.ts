import { ProductCategoriesService } from './categries_product.service';
import { CreateOrganizationCategoryDto } from './dto/create_categries_product.dto';
import { UpdateCategoryProductDto } from './dto/update_categries_product.dto';
import { GetCategoriesProductDto } from './dto/get_categries_product.dto';
export declare class ProductCategoriesController {
    #private;
    constructor(service: ProductCategoriesService);
    findall(query: GetCategoriesProductDto): Promise<{
        results: import("../../entities/product_Categories.entity").ProductCategoriesEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<import("../../entities/product_Categories.entity").ProductCategoriesEntity>;
    create(createOrganizationCategoryDto: CreateOrganizationCategoryDto): Promise<void>;
    update(id: string, updateCategoryProductDto: UpdateCategoryProductDto): Promise<void>;
    remove(id: string): Promise<void>;
}
