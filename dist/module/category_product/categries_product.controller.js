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
var _ProductCategoriesController__service;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categries_product_service_1 = require("./categries_product.service");
const create_categries_product_dto_1 = require("./dto/create_categries_product.dto");
const update_categries_product_dto_1 = require("./dto/update_categries_product.dto");
const get_categries_product_dto_1 = require("./dto/get_categries_product.dto");
let ProductCategoriesController = class ProductCategoriesController {
    constructor(service) {
        _ProductCategoriesController__service.set(this, void 0);
        __classPrivateFieldSet(this, _ProductCategoriesController__service, service, "f");
    }
    async findall(query) {
        return await __classPrivateFieldGet(this, _ProductCategoriesController__service, "f").findAll(query);
    }
    async findOne(id) {
        return await __classPrivateFieldGet(this, _ProductCategoriesController__service, "f").findOne(id);
    }
    async create(createOrganizationCategoryDto) {
        return await __classPrivateFieldGet(this, _ProductCategoriesController__service, "f").create(createOrganizationCategoryDto);
    }
    async update(id, updateCategoryProductDto) {
        return await __classPrivateFieldGet(this, _ProductCategoriesController__service, "f").update(id, updateCategoryProductDto);
    }
    async remove(id) {
        return await __classPrivateFieldGet(this, _ProductCategoriesController__service, "f").delete(id);
    }
};
_ProductCategoriesController__service = new WeakMap();
__decorate([
    (0, common_1.Get)('/all-with-sort'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_categries_product_dto_1.GetCategoriesProductDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)('/one/:id'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({ type: create_categries_product_dto_1.CreateCategoryProductSwaggerBodyDto }),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categries_product_dto_1.CreateOrganizationCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBody)({ type: update_categries_product_dto_1.UpdateCategoryProductSwaggerBodyDto }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_categries_product_dto_1.UpdateCategoryProductDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "update", null);
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
], ProductCategoriesController.prototype, "remove", null);
ProductCategoriesController = __decorate([
    (0, common_1.Controller)('product-categories'),
    (0, swagger_1.ApiTags)('Product categories'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [categries_product_service_1.ProductCategoriesService])
], ProductCategoriesController);
exports.ProductCategoriesController = ProductCategoriesController;
//# sourceMappingURL=categries_product.controller.js.map