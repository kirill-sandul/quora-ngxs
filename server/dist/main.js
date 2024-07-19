"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const default_1 = require("./config/default");
const cookie_parser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        credentials: true,
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
        origin: ['http://localhost:4200']
    });
    app.use(cookie_parser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT || default_1.config.port);
}
bootstrap();
//# sourceMappingURL=main.js.map