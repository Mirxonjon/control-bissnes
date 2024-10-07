"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersEntity = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const order_products_entity_1 = require("./order_products.entity");
const debt_entity_1 = require("./debt.entity");
const car_service_entity_1 = require("./car_service.entity");
let OrdersEntity = class OrdersEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrdersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "daily_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "paid_total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        default: '1',
    }),
    __metadata("design:type", String)
], OrdersEntity.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrdersEntity.prototype, "data_sequence", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], OrdersEntity.prototype, "update_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrdersEntity.prototype, "create_data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UsersEntity, (users) => users.orders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.UsersEntity)
], OrdersEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_products_entity_1.OrderProductsEntity, (orderProduct) => orderProduct.order_id),
    __metadata("design:type", Array)
], OrdersEntity.prototype, "orderProducts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => debt_entity_1.DebtsEntity, (debt) => debt.user_id, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], OrdersEntity.prototype, "debt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_service_entity_1.CarServiceEntity, (carService) => carService.user_id),
    __metadata("design:type", Array)
], OrdersEntity.prototype, "carServices", void 0);
OrdersEntity = __decorate([
    (0, typeorm_1.Entity)()
], OrdersEntity);
exports.OrdersEntity = OrdersEntity;
//# sourceMappingURL=orders.entity.js.map