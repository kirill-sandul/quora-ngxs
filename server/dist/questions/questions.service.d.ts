import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { EditAnswerDto } from './dto/edit-answer.dto';
import { EditQuestionDto } from './dto/edit-question.dto';
import { RemoveQuestionDto } from './dto/remove-question.dto';
import { RemoveAnswerDto } from './dto/remove-answer.dto';
import { VoteAnswerDto } from './dto/vote-answer.dto';
import { QuestionDocument } from '../shared/schemas/question/question.schema';
import { Question } from '../shared/schemas/question/question.schema';
export declare class QuestionsService {
    private question_model;
    private user_service;
    constructor(question_model: Model<QuestionDocument>, user_service: UserService);
    create_question(create_q_dto: CreateQuestionDto): Promise<Question & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    edit_question(edit_q_dto: EditQuestionDto): Promise<Question & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    remove_question(remove_q_dto: RemoveQuestionDto): Promise<Question & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    get_all(): Promise<(Question & mongoose.Document<any, any, any> & {
        _id: any;
    })[]>;
    select(start_index: number, last_index: number): Promise<(Question & mongoose.Document<any, any, any> & {
        _id: any;
    })[]>;
    get_selected_by_tag(start_index: number, last_index: number, tag_name: string): Promise<(Question & mongoose.Document<any, any, any> & {
        _id: any;
    })[]>;
    get_by_id(id: string): Promise<Question & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    get_by_search(search: string): Promise<Question & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    get_answer_by_id(q_id: string, answer_id: string): Promise<import("../shared/interfaces/answer.interface").IQuestionAnswer>;
    add_answer(add_answer_dto: AddAnswerDto): Promise<import("../shared/interfaces/answer.interface").IQuestionAnswer[]>;
    edit_answer(edit_answer_dto: EditAnswerDto): Promise<import("../shared/interfaces/answer.interface").IQuestionAnswer[]>;
    remove_answer(remove_answer_dto: RemoveAnswerDto): Promise<Question & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    like_answer(vote_answer_dto: VoteAnswerDto): Promise<import("../shared/interfaces/answer.interface").IQuestionAnswer[]>;
    dislike_answer(vote_answer_dto: VoteAnswerDto): Promise<import("../shared/interfaces/answer.interface").IQuestionAnswer[]>;
}
