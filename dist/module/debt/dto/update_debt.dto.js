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
exports.UpdateDebtSwaggerBodyDto = exports.UpdateDebtDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateDebtDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "remaining_debt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "dayToBeGiven", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "dayGiven", void 0);
exports.UpdateDebtDto = UpdateDebtDto;
class UpdateDebtSwaggerBodyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        required: false,
        example: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDebtSwaggerBodyDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        required: false,
        example: '123000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDebtSwaggerBodyDto.prototype, "remaining_debt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
        required: false,
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateDebtSwaggerBodyDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        required: false,
        example: 'yaxshi odamdir',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDebtSwaggerBodyDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date',
        required: false,
        example: '2023-01-01',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDebtSwaggerBodyDto.prototype, "dayToBeGiven", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date',
        required: false,
        example: '2023-01-01',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDebtSwaggerBodyDto.prototype, "dayGiven", void 0);
exports.UpdateDebtSwaggerBodyDto = UpdateDebtSwaggerBodyDto;
//# sourceMappingURL=update_debt.dto.js.map