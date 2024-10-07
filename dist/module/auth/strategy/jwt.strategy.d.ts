import { CustomRequest } from 'src/types';
declare const jwtStrategy_base: new (...args: any[]) => any;
export declare class jwtStrategy extends jwtStrategy_base {
    constructor();
    validate(req: CustomRequest, payload: any): Promise<{
        id: any;
        roles: any;
        password: any;
    }>;
}
export {};
