import { RolesEnum } from '../../../types';
export declare const ROLES_KEY = "roles";
export declare const RequiredRoles: (...roles: RolesEnum[]) => import("@nestjs/common").CustomDecorator<string>;
