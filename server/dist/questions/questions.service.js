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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const user_service_1 = require("../user/user.service");
const question_schema_1 = require("../shared/schemas/question/question.schema");
let QuestionsService = class QuestionsService {
    constructor(question_model, user_service) {
        this.question_model = question_model;
        this.user_service = user_service;
    }
    async create_question(create_q_dto) {
        let created_question = new this.question_model(Object.assign(Object.assign({}, create_q_dto), { date: new Date() }));
        return created_question.save();
    }
    async edit_question(edit_q_dto) {
        const { id, title, description, tags } = edit_q_dto;
        return await this.question_model.findByIdAndUpdate(id, { title, description, tags });
    }
    async remove_question(remove_q_dto) {
        const { id } = remove_q_dto;
        return await this.question_model.findByIdAndDelete(id);
    }
    async get_all() {
        return await this.question_model.find().exec();
    }
    async select(start_index, last_index) {
        const all = await this.get_all();
        return all.slice(start_index, last_index);
    }
    async get_selected_by_tag(start_index, last_index, tag_name) {
        const all = await this.get_all();
        const filtered = all.filter(q => q.tags.indexOf(tag_name) !== -1);
        return filtered.slice(start_index, last_index);
    }
    async get_by_id(id) {
        return await this.question_model.findById(id);
    }
    async get_by_search(search) {
        return await this.question_model.findOne({ title: search });
    }
    async get_answer_by_id(q_id, answer_id) {
        const selected_q = await this.get_by_id(q_id);
        return selected_q.answers.filter(answer => {
            answer.id === answer_id;
        })[0];
    }
    async add_answer(add_answer_dto) {
        const q_to_answer = await this.get_by_id(add_answer_dto.q_id);
        const { answers } = q_to_answer;
        const extracted_autor = await this.user_service.get_user_by_id(add_answer_dto.autor_id);
        const new_answer = Object.assign(Object.assign({}, add_answer_dto), { id: new mongoose_2.default.Types.ObjectId().toString(), autor: { _id: extracted_autor._id, login: extracted_autor.login } });
        q_to_answer.answers = [
            ...answers,
            Object.assign(Object.assign({}, new_answer), { votes: { liked_by: [], disliked_by: [] } })
        ];
        await q_to_answer.save();
        return q_to_answer.answers;
    }
    async edit_answer(edit_answer_dto) {
        const { q_id, answer_id, text } = edit_answer_dto;
        const q = await this.question_model.findById(q_id);
        const answer_example = q.answers.filter(answer => answer.id === answer_id)[0];
        const answer_index = q.answers.indexOf(answer_example);
        const answer = q.answers[answer_index];
        q.answers[answer_index] = Object.assign(Object.assign({}, answer), { text });
        q.save();
        return q.answers;
    }
    async remove_answer(remove_answer_dto) {
        const { q_id, answer_id } = remove_answer_dto;
        const selected_q = await this.get_by_id(q_id);
        selected_q.answers = selected_q.answers.filter(answer => {
            return answer.id !== answer_id;
        });
        return await selected_q.save();
    }
    async like_answer(vote_answer_dto) {
        const { q_id, voted_user_id, answer_id } = vote_answer_dto;
        const answer_question = await this.get_by_id(q_id);
        const voted_answer = answer_question.answers.filter(a => a.id === answer_id)[0];
        const answer_index = answer_question.answers.indexOf(voted_answer);
        if (!voted_answer.votes.liked_by.includes(voted_user_id)) {
            voted_answer.votes.liked_by.push(voted_user_id);
            if (voted_answer.votes.disliked_by.includes(voted_user_id)) {
                voted_answer.votes.disliked_by = voted_answer.votes.disliked_by.filter(id => id !== voted_user_id);
            }
        }
        else {
            voted_answer.votes.liked_by = voted_answer.votes.liked_by.filter(id => id !== voted_user_id);
        }
        answer_question.answers[answer_index] = voted_answer;
        await answer_question.save();
        return answer_question.answers;
    }
    async dislike_answer(vote_answer_dto) {
        const { q_id, voted_user_id, answer_id } = vote_answer_dto;
        const answer_question = await this.get_by_id(q_id);
        const voted_answer = answer_question.answers.filter(a => a.id === answer_id)[0];
        const answer_index = answer_question.answers.indexOf(voted_answer);
        if (!voted_answer.votes.disliked_by.includes(voted_user_id)) {
            voted_answer.votes.disliked_by.push(voted_user_id);
            if (voted_answer.votes.liked_by.includes(voted_user_id)) {
                voted_answer.votes.liked_by = voted_answer.votes.liked_by.filter(id => id !== voted_user_id);
            }
        }
        else {
            voted_answer.votes.disliked_by = voted_answer.votes.disliked_by.filter(id => id !== voted_user_id);
        }
        answer_question.answers[answer_index] = voted_answer;
        await answer_question.save();
        return answer_question.answers;
    }
};
QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_3.Model,
        user_service_1.UserService])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map