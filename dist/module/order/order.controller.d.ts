import { OrderServise } from './order.service';
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update_order.dto';
export declare class OrdersController {
    #private;
    constructor(service: OrderServise);
    findall(): Promise<import("../../entities/orders.entity").OrdersEntity[]>;
    findOne(id: string): Promise<import("../../entities/orders.entity").OrdersEntity>;
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
    }>;
    update(id: string, updateProductDto: UpdateOrderDto): Promise<void>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<void>;
    remove(id: string): Promise<void>;
}
