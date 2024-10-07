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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const common_2 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create_user.dto");
const swagger_1 = require("@nestjs/swagger");
const sign_in_user_dto_1 = require("./dto/sign_in-user.dto");
const roles_decorator_1 = require("./guards/roles.decorator");
const types_1 = require("../../types");
const platform_express_1 = require("@nestjs/platform-express");
const get_user_dto_1 = require("./dto/get_user.dto");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    register(body, file) {
        return this.service.createUser(body, (file === null || file === void 0 ? void 0 : file.image) ? file === null || file === void 0 ? void 0 : file.image[0] : null);
    }
    updateuser(id, body, file) {
        return this.service.updateUser(id, body, (file === null || file === void 0 ? void 0 : file.image) ? file === null || file === void 0 ? void 0 : file.image[0] : null);
    }
    signIn(body) {
        return this.service.signIn(body);
    }
    async findall(query) {
        return await this.service.getAllUsers(query);
    }
    async findOne(id) {
        return await this.service.findOne(id);
    }
    async deleteControlUser(id) {
        await this.service.deleteControlUser(id);
    }
};
__decorate([
    (0, common_1.Post)('/user/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserSwaggerBodyDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Attendance Punch In' }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'image' }])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Patch)('/user/update/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserSwaggerBodyDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Attendance Punch In' }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'image' }])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateuser", null);
__decorate([
    (0, common_1.Post)('user/signIn'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({ type: sign_in_user_dto_1.SingInUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_user_dto_1.SingInUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('getUser/all'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'write role or null' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)('/one/:id'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.RequiredRoles)(types_1.RolesEnum.ADMIN),
    (0, common_1.Delete)('/deleteUser/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteControlUser", null);
AuthController = __decorate([
    (0, common_2.Controller)('Auth'),
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthServise])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map