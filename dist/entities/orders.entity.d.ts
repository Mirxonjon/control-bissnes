import { BaseEntity } from 'typeorm';
import { UsersEntity } from './users.entity';
import { OrderProductsEntity } from './order_products.entity';
import { DebtsEntity } from './debt.entity';
import { CarServiceEntity } from './car_service.entity';
export declare class OrdersEntity extends BaseEntity {
    id: string;
    total_price: string;
    daily_price: string;
    paid_total: string;
    IsActive: string;
    data_sequence: Date;
    update_date: Date;
    create_data: Date;
    user_id: UsersEntity;
    orderProducts: OrderProductsEntity[];
    debt: DebtsEntity[];
    carServices: CarServiceEntity[];
}
