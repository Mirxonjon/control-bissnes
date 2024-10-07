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
exports.UpdateOrderStatusDto = exports.UpdateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_order_dto_1 = require("./create_order.dto");
const class_transformer_1 = require("class-transformer");
const update_order_product_dto_1 = require("./update_order_product.dto");
const update_order_servise_car_dto_1 = require("./update_order_servise_car.dto");
const update_order_debt_dto_1 = require("./update_order_debt.dto");
const create_order_debt_dto_1 = require("./create_order_debt.dto");
class UpdateOrderDto extends (0, swagger_1.PartialType)(create_order_dto_1.CreateOrderDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [update_order_product_dto_1.UpdateOrderProductDto],
        description: 'Yangilanadigan mahsulotlar',
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_order_product_dto_1.UpdateOrderProductDto),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [update_order_servise_car_dto_1.UpdateServiceCarDto],
        description: "Yangilanadigan xizmat avtomobili ma'lumotlari",
        required: false,
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_order_servise_car_dto_1.UpdateServiceCarDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "service_car", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [update_order_debt_dto_1.UpdateDebtDto],
        description: 'Yangilanadigan qarzlar',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_order_debt_dto_1.UpdateDebtDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "debts", void 0);
exports.UpdateOrderDto = UpdateOrderDto;
class UpdateOrderStatusDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: "Sotuv tugagandan so'ng statusni o'zgartirish va qarz bo'limiga qo'shish uchun",
        example: 'true',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateOrderStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => create_order_debt_dto_1.CreateDebtDto,
        description: 'Qarzlar',
    }),
    (0, class_transformer_1.Type)(() => create_order_debt_dto_1.CreateDebtDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_order_debt_dto_1.CreateDebtDto)
], UpdateOrderStatusDto.prototype, "debts", void 0);
exports.UpdateOrderStatusDto = UpdateOrderStatusDto;
//# sourceMappingURL=update_order.dto.js.map