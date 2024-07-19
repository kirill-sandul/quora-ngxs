"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const default_1 = require("../../config/default");
const jwt = require('jsonwebtoken');
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        if (req.method === 'OPTIONS')
            return next();
        try {
            const token = req.headers.auth.split(' ')[1];
            if (!token)
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'no_authorization' });
            const decoded = jwt.verify(token, default_1.config.jwt_secret);
            req['user'] = decoded;
            next();
        }
        catch (_a) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'no_authorization' });
        }
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map