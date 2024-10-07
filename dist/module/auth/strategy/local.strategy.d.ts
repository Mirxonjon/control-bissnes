import { AuthServise } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthServise);
    validate(id: string, password: string): Promise<any>;
}
export {};
