"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.config = void 0;
const app_1 = require("./app");
exports.config = {
    load: [app_1.appConfig],
    cache: true,
    isGlobal: true,
};
exports.Logger = {
    allLogs: 'true',
};
//# sourceMappingURL=index.js.map