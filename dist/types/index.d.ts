export interface CustomRequest extends Request {
    userId: string;
    role: string;
}
export interface CustomHeaders extends Headers {
    authorization: string;
}
export declare enum RolesEnum {
    USER = "user",
    ADMIN = "admin"
}
export declare enum StatusEnum {
    TRUE = "1",
    FALSE = "0"
}
export declare enum TypeProductEnum {
    COUNT = "count",
    METR = "metr"
}
export declare enum ServiceCarTypeEnum {
    PROFIT = "profit",
    EXPENSE = "expense"
}
export declare enum ActionTypesEnum {
    GET = "get",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum OrderProductTypeEnum {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
