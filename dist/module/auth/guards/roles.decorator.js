"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredRoles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
const RequiredRoles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.RequiredRoles = RequiredRoles;
//# sourceMappingURL=roles.decorator.js.map