import { CreateOrderProductDto } from './create_order_product.dto';
import { CreateServiceCarDto } from './create_order_servise_car.dto';
export declare class CreateOrderDto {
    user_id: string;
    daily_price: string;
    total_price: string;
    paid_total: string;
    products: CreateOrderProductDto[];
    service_car: CreateServiceCarDto[];
}
