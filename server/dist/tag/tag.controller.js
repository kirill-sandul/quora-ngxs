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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const add_tag_dto_1 = require("./add-tag.dto");
let TagController = class TagController {
    constructor(tag_service) {
        this.tag_service = tag_service;
    }
    async get_all(response) {
        const tags = await this.tag_service.get_all();
        return response.status(common_1.HttpStatus.OK).json({ tags });
    }
    async get_by_name(name, response) {
        const tag = await this.tag_service.get_by_name(name);
        return response.status(common_1.HttpStatus.OK).json({ tag });
    }
    async select_tags(start_index, last_index, response) {
        const selected = await this.tag_service.select_tags(start_index, last_index);
        return response.status(common_1.HttpStatus.OK).json({ selected });
    }
    async add_tag(add_tag_dto, response) {
        const new_tag = await this.tag_service.add(add_tag_dto);
        return response.status(common_1.HttpStatus.CREATED).json({ new_tag });
    }
};
__decorate([
    (0, common_1.Get)('get_all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "get_all", null);
__decorate([
    (0, common_1.Get)('get/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "get_by_name", null);
__decorate([
    (0, common_1.Get)('select_tags'),
    __param(0, (0, common_1.Query)('start_index')),
    __param(1, (0, common_1.Query)('last_index')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "select_tags", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_tag_dto_1.AddTagDto, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "add_tag", null);
TagController = __decorate([
    (0, common_1.Controller)('tag'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map