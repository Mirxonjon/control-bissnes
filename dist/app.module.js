"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("./config");
const typeorm_2 = require("./config/typeorm");
const auth_module_1 = require("./module/auth/auth.module");
const categries_product_module_1 = require("./module/category_product/categries_product.module");
const product_module_1 = require("./module/product/product.module");
const debt_module_1 = require("./module/debt/debt.module");
const car_service_module_1 = require("./module/car_service/car_service.module");
const order_module_1 = require("./module/order/order.module");
const roles_guard_1 = require("./module/auth/guards/roles.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(config_2.config),
            typeorm_1.TypeOrmModule.forRoot(typeorm_2.connectDb),
            auth_module_1.AuthModule,
            categries_product_module_1.ProductCategoriesModule,
            order_module_1.OrderModule,
            product_module_1.ProductModule,
            debt_module_1.DebtModule,
            car_service_module_1.CarServiceModule,
        ],
        controllers: [],
        providers: [{
                provide: 'APP_GUARD',
                useClass: roles_guard_1.RolesGuard,
            },],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map