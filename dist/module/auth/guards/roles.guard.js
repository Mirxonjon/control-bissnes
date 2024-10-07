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
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const roles_decorator_1 = require("./roles.decorator");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(RolesGuard_1.name);
    }
    canActivate(context) {
        var _a;
        const methodName = this.canActivate.name;
        try {
            const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            console.log(requiredRoles);
            if (!requiredRoles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                this.logger.debug(`Method: ${methodName} - Error: `, 'Not token');
                throw new common_1.ForbiddenException('Not token');
            }
            const user = this.jwtService.verify(token);
            request.userId = user === null || user === void 0 ? void 0 : user.id;
            const resultRole = requiredRoles.some((role) => { var _a; return (_a = user.role) === null || _a === void 0 ? void 0 : _a.includes(role); });
            if (!resultRole) {
                this.logger.debug(`Method: ${methodName} - Error: `, 'Role Erorr');
                throw new common_1.ForbiddenException('Must be role - ' + resultRole + requiredRoles);
            }
            console.log(requiredRoles.some((role) => { var _a; return (_a = user.role) === null || _a === void 0 ? void 0 : _a.includes(role); }));
            return requiredRoles.some((role) => { var _a; return (_a = user.role) === null || _a === void 0 ? void 0 : _a.includes(role); });
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.ForbiddenException('Invalid token');
        }
    }
};
RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_1.JwtService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map