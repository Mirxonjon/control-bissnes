import { CreateCarServiceDto } from './dto/create_car_service.dto';
import { UpdateCarServiceDto } from './dto/update_car_service.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CarServiceEntity } from 'src/entities/car_service.entity';
import { GetCarServiceDto } from './dto/get_car_service.dto';
export declare class CarServiceServise {
    private logger;
    findAll(query: GetCarServiceDto): Promise<{
        results: CarServiceEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<CarServiceEntity>;
    create(body: CreateCarServiceDto): Promise<{
        message: string;
    }>;
    update(id: string, body: UpdateCarServiceDto): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
}
