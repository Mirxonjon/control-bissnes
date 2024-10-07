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
exports.CarServiceEntity = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const orders_entity_1 = require("./orders.entity");
let CarServiceEntity = class CarServiceEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CarServiceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], CarServiceEntity.prototype, "profit_or_expense", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], CarServiceEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], CarServiceEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CarServiceEntity.prototype, "create_data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UsersEntity, (user) => user.carServices),
    __metadata("design:type", users_entity_1.UsersEntity)
], CarServiceEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orders_entity_1.OrdersEntity, (user) => user.carServices),
    __metadata("design:type", orders_entity_1.OrdersEntity)
], CarServiceEntity.prototype, "order_id", void 0);
CarServiceEntity = __decorate([
    (0, typeorm_1.Entity)()
], CarServiceEntity);
exports.CarServiceEntity = CarServiceEntity;
//# sourceMappingURL=car_service.entity.js.map