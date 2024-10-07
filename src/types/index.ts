export interface CustomRequest extends Request {
  userId: string;
  role: string;
}

export interface CustomHeaders extends Headers {
  authorization: string;
}
export enum RolesEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export enum StatusEnum {
  TRUE = '1',
  FALSE = '0',
}

export enum TypeProductEnum {
  COUNT = 'count',
  METR = 'metr',
}

export enum ServiceCarTypeEnum {
  PROFIT = 'profit',
  EXPENSE = 'expense',
}

export enum ActionTypesEnum {
  GET = 'get',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum OrderProductTypeEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
