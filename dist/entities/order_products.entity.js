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
exports.OrderProductsEntity = void 0;
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("./products.entity");
let OrderProductsEntity = class OrderProductsEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderProductsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], OrderProductsEntity.prototype, "measurement_sold", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], OrderProductsEntity.prototype, "quantity_sold", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
    }),
    __metadata("design:type", String)
], OrderProductsEntity.prototype, "price_per_day", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        default: 'active',
    }),
    __metadata("design:type", String)
], OrderProductsEntity.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
    }),
    __metadata("design:type", String)
], OrderProductsEntity.prototype, "unused_days", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], OrderProductsEntity.prototype, "given_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], OrderProductsEntity.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], OrderProductsEntity.prototype, "update_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderProductsEntity.prototype, "data_sequence", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrderProductsEntity.prototype, "create_data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orders_entity_1.OrdersEntity, (order) => order.orderProducts),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", orders_entity_1.OrdersEntity)
], OrderProductsEntity.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.ProductsEntity, (product) => product.productItems),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", products_entity_1.ProductsEntity)
], OrderProductsEntity.prototype, "product_id", void 0);
OrderProductsEntity = __decorate([
    (0, typeorm_1.Entity)()
], OrderProductsEntity);
exports.OrderProductsEntity = OrderProductsEntity;
//# sourceMappingURL=order_products.entity.js.map