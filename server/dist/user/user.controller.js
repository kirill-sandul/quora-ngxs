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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const follow_dto_1 = require("./follow.dto");
let UserController = class UserController {
    constructor(user_service) {
        this.user_service = user_service;
    }
    async get_user_by_id(id, response) {
        const user_by_id = await this.user_service.get_user_by_id(id);
        return response
            .status(common_1.HttpStatus.ACCEPTED)
            .json({ user: user_by_id });
    }
    async get_user(request, response) {
        const logged_user = await this.user_service.get_logged_user(request['user'].id);
        return response
            .status(common_1.HttpStatus.ACCEPTED)
            .json({ logged_user });
    }
    async get_followed_tags(request, response) {
        const followed_tags = await this.user_service.get_followed_tags(request['user'].id);
        return response.status(common_1.HttpStatus.OK).json({ followed_tags });
    }
    async follow_tag(follow_dto, request, response) {
        const res = await this.user_service.follow_tag(request['user'].id, follow_dto);
        if (res.error)
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ error: res.error });
        return response.status(common_1.HttpStatus.ACCEPTED).json({ tag: res.tag });
    }
    async unfollow_tag(follow_dto, request, response) {
        const tag = await this.user_service.unfollow_tag(request['user'].id, follow_dto);
        return response.status(common_1.HttpStatus.OK).json(tag);
    }
};
__decorate([
    (0, common_1.Get)('get-by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get_user_by_id", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get_user", null);
__decorate([
    (0, common_1.Get)('get_followed_tags'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get_followed_tags", null);
__decorate([
    (0, common_1.Post)('follow_tag'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_dto_1.FollowDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "follow_tag", null);
__decorate([
    (0, common_1.Delete)('unfollow_tag'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_dto_1.FollowDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unfollow_tag", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map