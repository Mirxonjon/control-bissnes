import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update_order.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { OrdersEntity } from 'src/entities/orders.entity';
export declare class OrderServise {
    private logger;
    findAll(): Promise<OrdersEntity[]>;
    findOne(id: string): Promise<OrdersEntity>;
    create(body: CreateOrderDto): Promise<{
        message: string;
    }>;
    update(id: string, body: UpdateOrderDto): Promise<UpdateResult>;
    updateStatus(id: string, body: UpdateOrderStatusDto): Promise<void>;
    delete(id: string): Promise<DeleteResult>;
}
