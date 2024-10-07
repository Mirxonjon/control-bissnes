"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const custom_exetepsion_filter_1 = require("./filter/custom.exetepsion.filter");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const cors = require("cors");
const swagger_2 = require("./config/swagger");
const Config = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: Config.Logger.allLogs
            ? ['log', 'debug', 'error', 'verbose', 'warn']
            : ['log', 'error', 'warn'],
    });
    app.use(cors({
        origin: '*',
        credentials: true,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new custom_exetepsion_filter_1.ErrorHandle());
    app.setGlobalPrefix('api/v1');
    const config = app.get(config_1.ConfigService);
    const host = config.getOrThrow('app.host');
    const port = config.getOrThrow('app.port');
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_2.swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, host);
}
bootstrap();
//# sourceMappingURL=main.js.map