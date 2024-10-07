import { CreateOrderProductDto } from './create_order_product.dto';
declare const UpdateOrderProductDto_base: import("@nestjs/common").Type<Partial<CreateOrderProductDto>>;
export declare class UpdateOrderProductDto extends UpdateOrderProductDto_base {
    order_product_id: string;
    product_id: string;
    action: string;
    status: string;
    measurement_sold: string;
    quantity_sold: string;
    price_per_day: string;
}
export {};
