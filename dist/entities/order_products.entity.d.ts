import { BaseEntity } from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { ProductsEntity } from './products.entity';
export declare class OrderProductsEntity extends BaseEntity {
    id: string;
    measurement_sold: string;
    quantity_sold: string;
    price_per_day: string;
    IsActive: string;
    unused_days: string;
    given_date: Date;
    end_date: Date;
    update_date: Date;
    data_sequence: Date;
    create_data: Date;
    order_id: OrdersEntity;
    product_id: ProductsEntity;
}
