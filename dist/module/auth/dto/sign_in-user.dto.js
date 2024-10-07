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
exports.SingInUserSwaggerBodyDto = exports.SingInUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SingInUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Phone',
        example: '+998933843484',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SingInUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Phone',
        example: '1234',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SingInUserDto.prototype, "password", void 0);
exports.SingInUserDto = SingInUserDto;
class SingInUserSwaggerBodyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Phone',
        example: '+998933843484',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SingInUserSwaggerBodyDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Phone',
        example: '1234',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SingInUserSwaggerBodyDto.prototype, "password", void 0);
exports.SingInUserSwaggerBodyDto = SingInUserSwaggerBodyDto;
//# sourceMappingURL=sign_in-user.dto.js.map