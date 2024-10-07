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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_order_product_dto_1 = require("./create_order_product.dto");
const create_order_servise_car_dto_1 = require("./create_order_servise_car.dto");
class CreateOrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Foydalanuvchi ID',
        example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Kunlik narx',
        example: '10000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "daily_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Umumiy narx',
        example: '200000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "total_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: "To'langan jami summa",
        example: '50000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paid_total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [create_order_product_dto_1.CreateOrderProductDto],
        description: 'Sotib olingan mahsulotlar',
        examples: [create_order_product_dto_1.CreateOrderProductDto, create_order_product_dto_1.CreateOrderProductDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_order_product_dto_1.CreateOrderProductDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [create_order_servise_car_dto_1.CreateServiceCarDto],
        description: "Xizmat avtomobili ma'lumotlari",
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_order_servise_car_dto_1.CreateServiceCarDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "service_car", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create_order.dto.js.map