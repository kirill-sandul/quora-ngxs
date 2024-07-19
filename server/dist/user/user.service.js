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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./../shared/schemas/user.schema");
const tag_service_1 = require("../tag/tag.service");
let UserService = class UserService {
    constructor(user_model, tag_service) {
        this.user_model = user_model;
        this.tag_service = tag_service;
    }
    async get_user_by_id(id) {
        return await this.user_model.findById(id);
    }
    async get_logged_user(id) {
        return await this.user_model.findById(id);
    }
    async get_followed_tags(user_id) {
        const { followings } = await this.get_user_by_id(user_id);
        const _tags = [];
        const tags = await this.tag_service.get_all();
        followings.forEach((t, index) => {
            const tag = tags.filter(t => t.name === followings[index])[0];
            _tags.push(tag);
        });
        return _tags;
    }
    async follow_tag(user_id, follow_dto) {
        const { tag_name } = follow_dto;
        const user = await this.get_user_by_id(user_id);
        const yet_followed = !!user.followings.filter(t => t === tag_name).length;
        if (yet_followed)
            return { error: 'yet_followed' };
        user.followings.push(tag_name);
        await user.save();
        return { error: '', tag: await this.tag_service.follow(tag_name) };
    }
    async unfollow_tag(user_id, follow_dto) {
        const { tag_name } = follow_dto;
        const user = await this.get_user_by_id(user_id);
        const yet_unfollowed = !user.followings.filter(t => t === tag_name).length;
        if (yet_unfollowed)
            return { error: 'yet_unfollowed' };
        user.followings = user.followings.filter(t => t !== tag_name);
        await user.save();
        return { tag: await this.tag_service.unfollow(tag_name) };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        tag_service_1.TagService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map