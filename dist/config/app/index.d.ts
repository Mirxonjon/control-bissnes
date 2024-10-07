declare class AppConfig {
    readonly host: string;
    readonly port: number;
}
export declare const appConfig: (() => AppConfig) & import("@nestjs/config").ConfigFactoryKeyHost<AppConfig>;
export {};
