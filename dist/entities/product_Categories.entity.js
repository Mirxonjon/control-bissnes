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
exports.ProductCategoriesEntity = void 0;
const typeorm_1 = require("typeorm");
const products_entity_1 = require("./products.entity");
let ProductCategoriesEntity = class ProductCategoriesEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductCategoriesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'character varying',
        nullable: false,
    }),
    __metadata("design:type", String)
], ProductCategoriesEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProductCategoriesEntity.prototype, "update_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductCategoriesEntity.prototype, "create_data", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_entity_1.ProductsEntity, (products) => products.category_id),
    __metadata("design:type", Array)
], ProductCategoriesEntity.prototype, "products", void 0);
ProductCategoriesEntity = __decorate([
    (0, typeorm_1.Entity)()
], ProductCategoriesEntity);
exports.ProductCategoriesEntity = ProductCategoriesEntity;
//# sourceMappingURL=product_Categories.entity.js.map