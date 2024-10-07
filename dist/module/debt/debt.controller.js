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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DebtsController__service;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const debt_service_1 = require("./debt.service");
const create_debt_dto_1 = require("./dto/create_debt.dto");
const update_debt_dto_1 = require("./dto/update_debt.dto");
const get_debt_dto_1 = require("./dto/get_debt.dto");
let DebtsController = class DebtsController {
    constructor(service) {
        _DebtsController__service.set(this, void 0);
        __classPrivateFieldSet(this, _DebtsController__service, service, "f");
    }
    async findall(query) {
        return await __classPrivateFieldGet(this, _DebtsController__service, "f").findAll(query);
    }
    async findOne(id) {
        return await __classPrivateFieldGet(this, _DebtsController__service, "f").findOne(id);
    }
    async create(createProductDto) {
        return await __classPrivateFieldGet(this, _DebtsController__service, "f").create(createProductDto);
    }
    async update(id, updateProductDto) {
        await __classPrivateFieldGet(this, _DebtsController__service, "f").update(id, updateProductDto);
    }
    async remove(id) {
        await __classPrivateFieldGet(this, _DebtsController__service, "f").delete(id);
    }
};
_DebtsController__service = new WeakMap();
__decorate([
    (0, common_1.Get)('/all'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_debt_dto_1.GetUDebtDto]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)('/one/:id'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({ type: create_debt_dto_1.CreateDebtSwaggerBodyDto }),
    (0, swagger_1.ApiOperation)({ description: 'Create Product with role' }),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_debt_dto_1.CreateDebtDto]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBody)({ type: update_debt_dto_1.UpdateDebtSwaggerBodyDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Update with role' }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_debt_dto_1.UpdateDebtDto]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "remove", null);
DebtsController = __decorate([
    (0, common_1.Controller)('debt'),
    (0, swagger_1.ApiTags)('Debt'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [debt_service_1.DebtServise])
], DebtsController);
exports.DebtsController = DebtsController;
//# sourceMappingURL=debt.controller.js.map