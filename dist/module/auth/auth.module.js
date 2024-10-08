"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./strategy/local.strategy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
dotenv.config();
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY,
                global: true,
                signOptions: { expiresIn: '43200s' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [local_strategy_1.LocalStrategy, jwt_strategy_1.jwtStrategy, auth_service_1.AuthServise],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map