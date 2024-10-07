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
exports.ProductsEntity = void 0;
const typeorm_1 = require("typeorm");
const product_Categories_entity_1 = require("./product_Categories.entity");
const order_products_entity_1 = require("./order_products.entity");
let ProductsEntity = class ProductsEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "searchable_title_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "total_measurement", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "current_measurement", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "total_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], ProductsEntity.prototype, "current_quantity", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProductsEntity.prototype, "update_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductsEntity.prototype, "data_sequence", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductsEntity.prototype, "create_data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_Categories_entity_1.ProductCategoriesEntity, (categories) => categories.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", product_Categories_entity_1.ProductCategoriesEntity)
], ProductsEntity.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_products_entity_1.OrderProductsEntity, (orderItem) => orderItem.product_id),
    __metadata("design:type", Array)
], ProductsEntity.prototype, "productItems", void 0);
ProductsEntity = __decorate([
    (0, typeorm_1.Entity)()
], ProductsEntity);
exports.ProductsEntity = ProductsEntity;
//# sourceMappingURL=products.entity.js.map