import { CreateOrderDto } from './create_order.dto';
import { UpdateOrderProductDto } from './update_order_product.dto';
import { UpdateServiceCarDto } from './update_order_servise_car.dto';
import { UpdateDebtDto } from './update_order_debt.dto';
import { CreateDebtDto } from './create_order_debt.dto';
declare const UpdateOrderDto_base: import("@nestjs/common").Type<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
    products?: UpdateOrderProductDto[];
    service_car?: UpdateServiceCarDto[];
    debts?: UpdateDebtDto[];
}
export declare class UpdateOrderStatusDto {
    status: string;
    debts?: CreateDebtDto;
}
export {};
