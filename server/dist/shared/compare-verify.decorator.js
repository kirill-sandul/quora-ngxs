"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareVerify = void 0;
const common_1 = require("@nestjs/common");
exports.CompareVerify = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const res = ctx.switchToHttp().getResponse();
    const { verify } = req.body;
    if (!verify || verify.autor_id !== verify.submitter_id) {
        res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Не уполномочен' });
        return false;
    }
    return true;
});
//# sourceMappingURL=compare-verify.decorator.js.map