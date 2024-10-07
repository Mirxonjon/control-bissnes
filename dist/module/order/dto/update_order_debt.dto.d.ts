import { CreateDebtDto } from './create_order_debt.dto';
declare const UpdateDebtDto_base: import("@nestjs/common").Type<Partial<CreateDebtDto>>;
export declare class UpdateDebtDto extends UpdateDebtDto_base {
    action: string;
    isActive: string;
    remaining_debt: string;
    dayToBeGiven: string;
    dayGiven: string;
}
export {};
