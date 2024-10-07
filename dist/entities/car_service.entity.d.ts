import { BaseEntity } from 'typeorm';
import { UsersEntity } from './users.entity';
import { OrdersEntity } from './orders.entity';
export declare class CarServiceEntity extends BaseEntity {
    id: string;
    profit_or_expense: string;
    price: string;
    comment: string;
    create_data: Date;
    user_id: UsersEntity;
    order_id: OrdersEntity;
}
