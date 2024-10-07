import { BaseEntity } from 'typeorm';
import { ProductsEntity } from './products.entity';
export declare class ProductCategoriesEntity extends BaseEntity {
    id: string;
    title: string;
    update_date: Date;
    create_data: Date;
    products: ProductsEntity[];
}
