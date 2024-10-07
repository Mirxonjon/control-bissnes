import { BaseEntity } from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { DebtsEntity } from './debt.entity';
import { CarServiceEntity } from './car_service.entity';
export declare class UsersEntity extends BaseEntity {
    id: string;
    first_name: string;
    name: string;
    last_name: string;
    password: string;
    role: string;
    phone: string;
    img: string;
    comment: string;
    update_date: Date;
    create_data: Date;
    orders: OrdersEntity[];
    debts: DebtsEntity[];
    carServices: CarServiceEntity[];
}
