import { CreateDebtDto } from './dto/create_debt.dto';
import { UpdateDebtDto } from './dto/update_debt.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DebtsEntity } from 'src/entities/debt.entity';
import { GetUDebtDto } from './dto/get_debt.dto';
export declare class DebtServise {
    private logger;
    findAll(query: GetUDebtDto): Promise<{
        results: DebtsEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<DebtsEntity>;
    create(body: CreateDebtDto): Promise<{
        message: string;
    }>;
    update(id: string, body: UpdateDebtDto): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
}
