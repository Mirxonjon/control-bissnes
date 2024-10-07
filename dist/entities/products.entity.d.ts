import { BaseEntity } from 'typeorm';
import { ProductCategoriesEntity } from './product_Categories.entity';
import { OrderProductsEntity } from './order_products.entity';
export declare class ProductsEntity extends BaseEntity {
    id: string;
    title: string;
    searchable_title_id: string;
    type: string;
    price: string;
    total_measurement: string;
    current_measurement: string;
    total_quantity: string;
    current_quantity: string;
    update_date: Date;
    data_sequence: Date;
    create_data: Date;
    category_id: ProductCategoriesEntity;
    productItems: OrderProductsEntity[];
}
