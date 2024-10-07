import { CreateServiceCarDto } from './create_order_servise_car.dto';
declare const UpdateServiceCarDto_base: import("@nestjs/common").Type<Partial<CreateServiceCarDto>>;
export declare class UpdateServiceCarDto extends UpdateServiceCarDto_base {
    service_car_id: string;
    action: string;
    price: string;
}
export {};
