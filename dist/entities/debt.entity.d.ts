import { BaseEntity } from 'typeorm';
import { UsersEntity } from './users.entity';
import { OrdersEntity } from './orders.entity';
export declare class DebtsEntity extends BaseEntity {
    id: string;
    remaining_debt: string;
    isActive: string;
    comment: string;
    dayToBeGiven: Date;
    dayGiven: Date;
    update_date: Date;
    create_data: Date;
    user_id: UsersEntity;
    order_id: OrdersEntity;
}
