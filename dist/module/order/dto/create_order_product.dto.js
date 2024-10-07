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
exports.CreateOrderProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Mahsulot ID',
        example: '88dd8fbb-1234-4a4b-9f2f-1cc4b1ff12b8',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderProductDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: "Sotilgan o'lchov",
        example: '110',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderProductDto.prototype, "measurement_sold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Sotilgan miqdor',
        example: '20',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderProductDto.prototype, "quantity_sold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Kunlik narx',
        example: '50000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderProductDto.prototype, "price_per_day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Foydalanilmagan kunlar',
        example: '5',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderProductDto.prototype, "unused_days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Berilgan sana',
        example: '2023-09-25T10:00:00Z',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderProductDto.prototype, "given_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Tugash sanasi',
        example: '2023-10-01T10:00:00Z',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderProductDto.prototype, "end_date", void 0);
exports.CreateOrderProductDto = CreateOrderProductDto;
//# sourceMappingURL=create_order_product.dto.js.map