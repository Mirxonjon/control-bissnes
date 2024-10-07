import { CarServiceServise } from './car_service.service';
import { CreateCarServiceDto } from './dto/create_car_service.dto';
import { UpdateCarServiceDto } from './dto/update_car_service.dto';
import { GetCarServiceDto } from './dto/get_car_service.dto';
export declare class CarServiceController {
    #private;
    constructor(service: CarServiceServise);
    findall(query: GetCarServiceDto): Promise<{
        results: import("../../entities/car_service.entity").CarServiceEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<import("../../entities/car_service.entity").CarServiceEntity>;
    create(createProductDto: CreateCarServiceDto): Promise<{
        message: string;
    }>;
    update(id: string, updateProductDto: UpdateCarServiceDto): Promise<void>;
    remove(id: string): Promise<void>;
}
