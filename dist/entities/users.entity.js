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
exports.UsersEntity = void 0;
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const debt_entity_1 = require("./debt.entity");
const car_service_entity_1 = require("./car_service.entity");
let UsersEntity = class UsersEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        default: 'user',
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "update_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "create_data", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.OrdersEntity, (order) => order.user_id),
    __metadata("design:type", Array)
], UsersEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => debt_entity_1.DebtsEntity, (debt) => debt.user_id, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], UsersEntity.prototype, "debts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_service_entity_1.CarServiceEntity, (carService) => carService.user_id),
    __metadata("design:type", Array)
], UsersEntity.prototype, "carServices", void 0);
UsersEntity = __decorate([
    (0, typeorm_1.Entity)()
], UsersEntity);
exports.UsersEntity = UsersEntity;
//# sourceMappingURL=users.entity.js.map