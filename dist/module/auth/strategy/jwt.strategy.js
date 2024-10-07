"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class jwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
            PassReqToCallback: true,
            pass: true,
        });
    }
    async validate(req, payload) {
        console.log(payload);
        return { id: payload.id, roles: payload.role, password: payload.password };
    }
}
exports.jwtStrategy = jwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map