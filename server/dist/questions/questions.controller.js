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
exports.QuestionsController = void 0;
const edit_question_dto_1 = require("./dto/edit-question.dto");
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questions.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const remove_question_dto_1 = require("./dto/remove-question.dto");
const add_answer_dto_1 = require("./dto/add-answer.dto");
const remove_answer_dto_1 = require("./dto/remove-answer.dto");
const vote_answer_dto_1 = require("./dto/vote-answer.dto");
const edit_answer_dto_1 = require("./dto/edit-answer.dto");
const compare_verify_decorator_1 = require("../shared/compare-verify.decorator");
let QuestionsController = class QuestionsController {
    constructor(questions_service) {
        this.questions_service = questions_service;
    }
    async get_all(response) {
        const all_q = await this.questions_service.get_all();
        return response.status(common_1.HttpStatus.ACCEPTED).json({ message: 'Получены вопросы', all_q });
    }
    async get(id, response) {
        const selected_q = await this.questions_service.get_by_id(id);
        return response.status(common_1.HttpStatus.ACCEPTED).json({ message: 'Получен вопрос', selected_q });
    }
    async search(search, response) {
        const found = await this.questions_service.get_by_search(search);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Получен вопрос', found });
    }
    async select(start_index, last_index, tag_name, response) {
        if (!tag_name) {
            const selected = await this.questions_service.select(start_index, last_index);
            return response.status(common_1.HttpStatus.OK).json({ message: 'Получены вопросы', selected });
        }
        const selected = await this.questions_service.get_selected_by_tag(start_index, last_index, tag_name);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Получены вопросы', selected });
    }
    async create_question(create_q_dto, response) {
        const { tags } = create_q_dto;
        if (!tags.length) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Тэги должны быть предоставлены' });
        }
        if (tags.length > 5) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Тэгов должно быть меньше 5' });
        }
        let repeated_tag;
        tags.forEach(tag => {
            repeated_tag = tags.filter(t => t === tag).length > 1;
        });
        if (repeated_tag)
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Повторение тэгов' });
        const created_q = await this.questions_service.create_question(create_q_dto);
        return response.status(common_1.HttpStatus.CREATED).json({ message: 'Создан вопрос', created_q });
    }
    async edit_question(verified, edit_q_dto, response) {
        if (!verified)
            return;
        const edited_q = await this.questions_service.edit_question(edit_q_dto);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Изменен вопрос', edited_q });
    }
    async remove_question(verified, remove_q_dto, response) {
        if (!verified)
            return;
        const removed_q = await this.questions_service.remove_question(remove_q_dto);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Удален вопрос', removed_q });
    }
    async add_answer(add_answer_dto, response) {
        const answers = await this.questions_service.add_answer(add_answer_dto);
        return response.status(common_1.HttpStatus.CREATED).json({ message: 'Создан ответ', answers });
    }
    async edit_answer(verified, edit_answer_dto, response) {
        if (!verified)
            return;
        const answers = await this.questions_service.edit_answer(edit_answer_dto);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Изменен ответ', answers });
    }
    async remove_answer(verified, remove_answer_dto, response) {
        if (!verified)
            return;
        const updated_q = await this.questions_service.remove_answer(remove_answer_dto);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Удален ответ', updated_q });
    }
    async like_answer(vote_answer_dto, response) {
        const answers = await this.questions_service.like_answer(vote_answer_dto);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Ответ проголосован', answers });
    }
    async dislike_answer(vote_answer_dto, response) {
        const answers = await this.questions_service.dislike_answer(vote_answer_dto);
        return response.status(common_1.HttpStatus.OK).json({ message: 'Ответ проголосован', answers });
    }
};
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "get_all", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('search/:search'),
    __param(0, (0, common_1.Param)('search')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('select'),
    __param(0, (0, common_1.Query)('start_index')),
    __param(1, (0, common_1.Query)('last_index')),
    __param(2, (0, common_1.Query)('tag_name')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "select", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "create_question", null);
__decorate([
    (0, common_1.Put)('edit'),
    __param(0, (0, compare_verify_decorator_1.CompareVerify)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, edit_question_dto_1.EditQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "edit_question", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, compare_verify_decorator_1.CompareVerify)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, remove_question_dto_1.RemoveQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "remove_question", null);
__decorate([
    (0, common_1.Post)('answer/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_answer_dto_1.AddAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "add_answer", null);
__decorate([
    (0, common_1.Put)('answer/edit'),
    __param(0, (0, compare_verify_decorator_1.CompareVerify)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, edit_answer_dto_1.EditAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "edit_answer", null);
__decorate([
    (0, common_1.Delete)('answer/remove'),
    __param(0, (0, compare_verify_decorator_1.CompareVerify)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, remove_answer_dto_1.RemoveAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "remove_answer", null);
__decorate([
    (0, common_1.Put)('answer/like'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vote_answer_dto_1.VoteAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "like_answer", null);
__decorate([
    (0, common_1.Put)('answer/dislike'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vote_answer_dto_1.VoteAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "dislike_answer", null);
QuestionsController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=questions.controller.js.map