import { DebtServise } from './debt.service';
import { CreateDebtDto } from './dto/create_debt.dto';
import { UpdateDebtDto } from './dto/update_debt.dto';
import { GetUDebtDto } from './dto/get_debt.dto';
export declare class DebtsController {
    #private;
    constructor(service: DebtServise);
    findall(query: GetUDebtDto): Promise<{
        results: import("../../entities/debt.entity").DebtsEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<import("../../entities/debt.entity").DebtsEntity>;
    create(createProductDto: CreateDebtDto): Promise<{
        message: string;
    }>;
    update(id: string, updateProductDto: UpdateDebtDto): Promise<void>;
    remove(id: string): Promise<void>;
}
